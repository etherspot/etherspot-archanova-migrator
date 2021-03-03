import { utils, BigNumberish } from 'ethers';
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
      throw new Error('Unsupported network');
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
    this.migration.transferBalance = value;
    return this;
  }

  transferERC20Tokens(tokens: MigrationToken[]): this {
    this.migration.transferERC20Tokens = tokens;
    return this;
  }

  transferENSNode(ensNode: string): this {
    this.migration.transferENSNode = ensNode;
    return this;
  }

  encodeTransactionRequests(
    archanovaAccountDeviceSignature: string,
  ): [TransactionRequest, TransactionRequest?] {
    const result: TransactionRequest[] = [];

    return [
      {
        to: null,
        data: null,
      },
    ];
  }

  encodeArchanovaAccountTransactionArgs(
    archanovaAccountDeviceSignature: string,
  ): ArchanovaAccountTransactionArgs {
    let result: ArchanovaAccountTransactionArgs = null;

    const requests = this.encodeTransactionRequests(
      archanovaAccountDeviceSignature,
    );

    if (requests) {
      const [req1, req2] = requests;

      result = [req1.to, 0, req2.data];

      if (req2) {
        result.push(req2.to, 0, req2.data);
      }
    }

    return result;
  }
}
