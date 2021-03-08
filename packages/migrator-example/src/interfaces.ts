import { Wallet } from 'ethers';

export interface Account {
  address: string;
}

export type EtherspotAccount = Account;

export interface ArchanovaAccount extends Account {
  id: number;
  device: Wallet;
  ensName: string;
  ensNameHash: string;
}
