import { BigNumberish } from 'ethers';

export interface MigratorOptions {
  chainId?: number;
  archanovaAccount: string;
  etherspotAccount: string;
}

export interface Migration {
  addAccountDevice?: boolean;
  transferBalance?: BigNumberish;
  transferERC20Tokens?: MigrationERC20Token[];
  transferERC721Tokens?: MigrationERC721Token[];
  transferENSNode?: string;
}

export interface MigrationCommonToken {
  token: string;
}

export interface MigrationERC20Token extends MigrationCommonToken {
  amount: BigNumberish;
}

export interface MigrationERC721Token extends MigrationCommonToken {
  id: BigNumberish;
  useLegacyTransferMethod?: boolean;
}

export type MigrationToken = MigrationERC20Token | MigrationERC721Token;

export type ArchanovaAccountTransactionArgs =
  | [string, any, string]
  | [string, any, string, string, any, string];

export interface TransactionRequest {
  to: string;
  data: string;
}
