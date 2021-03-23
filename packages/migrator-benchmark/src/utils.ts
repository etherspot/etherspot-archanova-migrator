import { BigNumber, BigNumberish, utils, Wallet } from 'ethers';
import {
  MigrationERC20Token,
  MigrationERC721Token,
} from '@etherspot/archanova-migrator';
import { accountProvider, erc20Token, erc721Token } from './contracts';
import { provider, ensRootName, ensRootNameHash, sender } from './constants';
import { Account, ArchanovaAccount, EtherspotAccount } from './interfaces';

let accountCounter = Date.now();
let erc721TokenIdCounter = Date.now();

export async function randomArchanovaAccount(): Promise<ArchanovaAccount> {
  const id = ++accountCounter;
  const device = Wallet.createRandom().connect(provider);
  const ensLabel = `account${id}`;
  const ensLabelHash = utils.id(ensLabel);
  const ensName = `${ensLabel}.${ensRootName}`;
  const ensNameHash = utils.namehash(ensName);

  const tx = await accountProvider.unsafeCreateAccount(
    id,
    device.address,
    ensLabelHash,
    ensRootNameHash,
    0,
  );

  const { events } = await tx.wait();

  const {
    args: { account: address },
  } = events.find(({ event }) => event === 'AccountCreated');

  return {
    id,
    device,
    address,
    ensName,
    ensNameHash,
  };
}

export function randomEtherspotAccount(): EtherspotAccount {
  const address = utils.getAddress(utils.hexlify(utils.randomBytes(20)));

  return {
    address,
  };
}

export function randomAmount(): number {
  return Math.floor(Math.random() * 10000000);
}

export async function topUpAccount(
  account: Account,
  value?: BigNumberish,
): Promise<BigNumber> {
  if (!value) {
    value = randomAmount();
  }

  if (typeof value === 'string') {
    value = utils.parseEther(value);
  }

  const tx = await sender.sendTransaction({
    to: account.address,
    value,
  });

  await tx.wait();

  return BigNumber.from(value);
}

export async function mintERC20Token(
  account: Account,
): Promise<MigrationERC20Token> {
  const amount = randomAmount();

  const tx = await erc20Token.mintTo(account.address, amount);
  await tx.wait();

  return {
    token: erc20Token.address,
    amount,
  };
}

export async function mintERC721Token(
  account: Account,
): Promise<MigrationERC721Token> {
  const id = ++erc721TokenIdCounter;

  const tx = await erc721Token.mintTo(account.address, id);
  await tx.wait();

  return {
    token: erc721Token.address,
    id,
  };
}
