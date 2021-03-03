import { BigNumberish } from 'ethers';

export interface MigratorOptions {
  chainId?: number;
  archanovaAccount: string;
  etherspotAccount: string;
}

export interface Migration {
  addAccountDevice?: boolean;
  transferBalance?: BigNumberish;
  transferERC20Tokens?: MigrationToken[];
  transferENSNode?: string;
}

export interface MigrationToken {
  token: string;
  amount: BigNumberish;
}

export type ArchanovaAccountTransactionArgs = [
  string,
  any,
  string,
  string?,
  any?,
  string?,
];

export interface TransactionRequest {
  to: string;
  data: string;
}
