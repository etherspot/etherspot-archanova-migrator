import { utils, BigNumberish, BigNumber } from 'ethers';
import {
  getContractAddress,
  getContractAbi,
  ContractNames,
} from '@etherspot/archanova-contracts-migrator';
import { MIGRATION_MESSAGE_PREFIX } from './constants';
import {
  MigratorOptions,
  Migration,
  MigrationERC20Token,
  MigrationERC721Token,
  ArchanovaAccountTransactionArgs,
  TransactionRequest,
} from './interfaces';
import { isAddress, prepareTokensArgs } from './utils';
import { MigratorException } from './migrator.exception';

export class Migrator {
  readonly migrationMessage: Uint8Array;

  private readonly options: MigratorOptions;

  private readonly migration: Migration = {};

  private readonly migratorAddress: string;

  private readonly migratorInterface = new utils.Interface(
    getContractAbi(ContractNames.ArchanovaMigrator),
  );

  private readonly accountInterface = new utils.Interface(
    getContractAbi(ContractNames.ArchanovaAccount),
  );

  constructor(options: MigratorOptions) {
    this.options = {
      chainId: 1,
      ...options,
    };

    const { chainId, archanovaAccount, etherspotAccount } = this.options;

    this.migratorAddress = getContractAddress(
      ContractNames.ArchanovaMigrator,
      chainId,
    );

    if (!this.migratorAddress) {
      throw new MigratorException('Unsupported network', {
        chainId,
      });
    }

    if (!isAddress(archanovaAccount)) {
      throw new MigratorException('Invalid archanova account address', {
        archanovaAccount,
      });
    }

    if (!isAddress(etherspotAccount)) {
      throw new MigratorException('Invalid etherspot account address', {
        etherspotAccount,
      });
    }

    this.migrationMessage = utils.arrayify(
      utils.solidityKeccak256(
        ['uint256', 'address', 'bytes32', 'address', 'address'],
        [
          chainId,
          this.migratorAddress,
          MIGRATION_MESSAGE_PREFIX,
          archanovaAccount,
          etherspotAccount,
        ],
      ),
    );
  }

  addAccountDevice(): this {
    this.migration.addAccountDevice = true;
    return this;
  }

  transferBalance(balance: BigNumberish): this {
    balance = BigNumber.from(balance || 0);

    if (balance.eq(0)) {
      throw new MigratorException('Balance should be greater then 0', {
        balance,
      });
    }

    this.migration.transferBalance = balance;
    return this;
  }

  transferERC20Tokens(tokens: MigrationERC20Token[]): this {
    if (!Array.isArray(tokens) || !tokens.length) {
      throw new MigratorException('Invalid ERC20 tokens list', {
        tokens,
      });
    }

    this.migration.transferERC20Tokens = tokens.map(({ token, amount }) => {
      amount = BigNumber.from(amount || 0);

      if (amount.eq(0)) {
        throw new MigratorException(
          'Amount of ERC20 token should be greater then 0',
          {
            token,
            amount,
          },
        );
      }

      if (!isAddress(token)) {
        throw new MigratorException('Invalid ERC20 token address', {
          token,
        });
      }

      return {
        token,
        amount,
      };
    });

    return this;
  }

  transferERC721Tokens(tokens: MigrationERC721Token[]): this {
    if (!Array.isArray(tokens) || !tokens.length) {
      throw new MigratorException('Invalid ERC721 tokens list', {
        tokens,
      });
    }

    this.migration.transferERC721Tokens = tokens.map(({ token, id }) => {
      id = BigNumber.from(id || 0);

      if (id.eq(0)) {
        throw new MigratorException('Invalid ERC721 token id', {
          token,
          id,
        });
      }

      if (!isAddress(token)) {
        throw new MigratorException('Invalid ERC721 token address', {
          token,
        });
      }

      return {
        token,
        id,
      };
    });

    return this;
  }

  transferENSName(ensName: string): this {
    const ensNode = utils.namehash(ensName);

    if (!ensNode) {
      throw new MigratorException('Invalid ENS name', {
        ensName,
        ensNode,
      });
    }

    this.migration.transferENSNode = ensNode;

    return this;
  }

  encodeTransactionRequests(
    archanovaAccountDeviceSignature: string,
  ): TransactionRequest[] {
    const result: TransactionRequest[] = [];

    const {
      addAccountDevice,
      transferBalance,
      transferERC20Tokens,
      transferERC721Tokens,
      transferENSNode,
    } = this.migration;

    if (
      !transferBalance &&
      !transferERC20Tokens &&
      !transferERC721Tokens &&
      !transferENSNode
    ) {
      throw new MigratorException('No transaction requests to encode');
    }

    const { archanovaAccount, etherspotAccount } = this.options;

    if (addAccountDevice) {
      const data = this.accountInterface.encodeFunctionData('addDevice', [
        this.migratorAddress,
        true,
      ]);

      result.push({
        to: archanovaAccount,
        data,
      });
    }

    const functionOpNames: string[] = [];
    const functionOpArgs: unknown[] = [];

    if (transferBalance) {
      functionOpNames.push('Balance');
      functionOpArgs.push(transferBalance);
    }

    if (transferERC20Tokens) {
      functionOpNames.push('ERC20Tokens');
      functionOpArgs.push(...prepareTokensArgs(transferERC20Tokens));
    }

    if (transferERC721Tokens) {
      functionOpNames.push('ERC721Tokens');
      functionOpArgs.push(...prepareTokensArgs(transferERC721Tokens));
    }

    if (transferENSNode) {
      functionOpNames.push('ENSNode');
      functionOpArgs.push(transferENSNode);
    }

    const functionName = `transfer${functionOpNames.join('And')}`;

    const data = this.migratorInterface.encodeFunctionData(functionName, [
      archanovaAccount,
      etherspotAccount,
      ...functionOpArgs,
      archanovaAccountDeviceSignature,
    ]);

    result.push({
      to: this.migratorAddress,
      data,
    });

    return result;
  }

  encodeArchanovaAccountTransactionArgs(
    archanovaAccountDeviceSignature: string,
  ): ArchanovaAccountTransactionArgs {
    let requests: TransactionRequest[];

    try {
      requests = this.encodeTransactionRequests(
        archanovaAccountDeviceSignature,
      );
    } catch (err) {
      throw new MigratorException(
        'No archanova account transaction args to encode',
      );
    }

    const [req1, req2] = requests;

    const result: ArchanovaAccountTransactionArgs = [req1.to, 0, req2.data];

    if (req2) {
      result.push(req2.to, 0, req2.data);
    }

    return result;
  }
}
