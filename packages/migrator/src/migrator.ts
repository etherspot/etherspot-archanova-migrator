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
  MigrationToken,
  ArchanovaAccountTransactionArgs,
  TransactionRequest,
} from './interfaces';
import { MigratorException } from './migrator.exception';
import { isAddress, prepareTokensArgs } from './utils';

export class Migrator {
  readonly migrationMessage: string;

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
      throw new MigratorException('unsupported network', {
        chainId,
      });
    }

    if (!isAddress(archanovaAccount)) {
      throw new MigratorException('invalid archanova account address', {
        archanovaAccount,
      });
    }

    if (!isAddress(etherspotAccount)) {
      throw new MigratorException('invalid etherspot account address', {
        etherspotAccount,
      });
    }

    this.migrationMessage = utils.solidityKeccak256(
      ['uint256', 'address', 'bytes32', 'address', 'address'],
      [
        chainId,
        this.migratorAddress,
        MIGRATION_MESSAGE_PREFIX,
        archanovaAccount,
        etherspotAccount,
      ],
    );
  }

  addAccountDevice(): this {
    this.migration.addAccountDevice = true;
    return this;
  }

  transferBalance(value: BigNumberish): this {
    value = BigNumber.from(value || 0);

    if (value.eq(0)) {
      throw new MigratorException('value should be greater then 0', {
        value,
      });
    }

    this.migration.transferBalance = value;
    return this;
  }

  transferERC20Tokens(tokens: MigrationToken[]): this {
    if (!Array.isArray(tokens) || !tokens.length) {
      throw new MigratorException('invalid tokens list', {
        tokens,
      });
    }

    this.migration.transferERC20Tokens = tokens.map(({ token, amount }) => {
      amount = BigNumber.from(amount || 0);

      if (amount.eq(0)) {
        throw new MigratorException(
          'amount of token should be greater then 0',
          {
            token,
            amount,
          },
        );
      }

      if (!isAddress(token)) {
        throw new MigratorException('invalid token address', {
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

  transferENSNode(ensName: string): this {
    const ensNode = utils.namehash(ensName);

    if (!ensNode) {
      throw new MigratorException('invalid ens name', {
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
      transferENSNode,
    } = this.migration;

    if (!transferBalance && !transferERC20Tokens && !transferENSNode) {
      throw new MigratorException('no transaction requests to encode');
    }

    const { archanovaAccount, etherspotAccount } = this.options;

    if (addAccountDevice) {
      const to = archanovaAccount;
      const data = this.accountInterface.encodeFunctionData('addDevice', [
        this.migratorAddress,
        true,
      ]);

      result.push({
        to,
        data,
      });
    }

    const to = archanovaAccount;
    let data: string;

    if (transferBalance && !transferERC20Tokens && !transferENSNode) {
      data = this.migratorInterface.encodeFunctionData('transferBalance', [
        archanovaAccount,
        etherspotAccount,
        transferBalance,
        archanovaAccountDeviceSignature,
      ]);
    } else if (!transferBalance && transferERC20Tokens && !transferENSNode) {
      data = this.migratorInterface.encodeFunctionData('transferERC20Tokens', [
        archanovaAccount,
        etherspotAccount,
        ...prepareTokensArgs(transferERC20Tokens),
        archanovaAccountDeviceSignature,
      ]);
    } else if (transferBalance && transferERC20Tokens && !transferENSNode) {
      data = this.migratorInterface.encodeFunctionData(
        'transferBalanceAndERC20Tokens',
        [
          archanovaAccount,
          etherspotAccount,
          transferBalance,
          ...prepareTokensArgs(transferERC20Tokens),
          archanovaAccountDeviceSignature,
        ],
      );
    } else if (!transferBalance && !transferERC20Tokens && transferENSNode) {
      data = this.migratorInterface.encodeFunctionData('transferENSNode', [
        archanovaAccount,
        etherspotAccount,
        transferENSNode,
        archanovaAccountDeviceSignature,
      ]);
    } else if (transferBalance && !transferERC20Tokens && transferENSNode) {
      data = this.migratorInterface.encodeFunctionData(
        'transferBalanceAndENSNode',
        [
          archanovaAccount,
          etherspotAccount,
          transferBalance,
          transferENSNode,
          archanovaAccountDeviceSignature,
        ],
      );
    } else if (!transferBalance && transferERC20Tokens && transferENSNode) {
      data = this.migratorInterface.encodeFunctionData(
        'transferERC20TokensAndENSNode',
        [
          archanovaAccount,
          etherspotAccount,
          ...prepareTokensArgs(transferERC20Tokens),
          transferENSNode,
          archanovaAccountDeviceSignature,
        ],
      );
    } else if (transferBalance && transferERC20Tokens && transferENSNode) {
      data = this.migratorInterface.encodeFunctionData(
        'transferBalanceAndERC20TokensAndENSNode',
        [
          archanovaAccount,
          etherspotAccount,
          transferBalance,
          ...prepareTokensArgs(transferERC20Tokens),
          transferENSNode,
          archanovaAccountDeviceSignature,
        ],
      );
    }

    result.push({
      to,
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
        'no archanova account transaction args to encode',
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
