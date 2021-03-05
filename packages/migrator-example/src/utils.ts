import { BigNumber, BigNumberish, Contract, utils, Wallet } from 'ethers';
import {
  accountProvider,
  ensRegistry,
  erc20Token1,
  erc20Token2,
} from './contracts';
import { provider, ensRootName, ensRootNameHash, sender } from './constants';
import { Account, ArchanovaAccount, EtherspotAccount } from './interfaces';

export async function createArchanovaAccount(): Promise<ArchanovaAccount> {
  const id = Math.floor(Date.now() / 1000);
  const device = Wallet.createRandom().connect(provider);
  const ensLabel = `account${id}`;
  const ensLabelHash = utils.id(ensLabel);
  const ensName = `${ensLabel}.${ensRootName}`;
  const ensNameHash = utils.namehash(ensName);

  const tx = await accountProvider.unsafeCreateAccount(
    Date.now(),
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

export function createEtherspotAccount(): EtherspotAccount {
  const address = utils.getAddress(utils.hexlify(utils.randomBytes(20)));

  return {
    address,
  };
}

async function logAccount(
  name: string,
  archanovaAccount: ArchanovaAccount,
  account: Account,
): Promise<void> {
  const { ensName, ensNameHash } = archanovaAccount;
  const { address } = account;
  const balanceWei = await provider.getBalance(address);
  const balanceERC20Token1 = await erc20Token1.balanceOf(address);
  const balanceERC20Token2 = await erc20Token2.balanceOf(address);
  const ensOwner = await ensRegistry.owner(ensNameHash);

  console.log(`  ${name} account`);
  console.log('  -----------------');
  console.log('  address:', address);
  console.log('  balance (wei):', balanceWei.toString());
  console.log('  balance (ERC20 token #1):', balanceERC20Token1.toString());
  console.log('  balance (ERC20 token #2):', balanceERC20Token2.toString());
  console.log('  ensName:', ensOwner === address ? ensName : '-');
}

export function logLabel(label: string): void {
  console.log(`* ${label}`);
  console.log(' ');
}

export function logMessage(...args: any[]): void {
  console.log(
    ...args.map((arg, index) => {
      if (arg instanceof BigNumber) {
        arg = arg.toString();
      }

      let result: string = arg;

      if (!index) {
        result = `  ${result}`;
      }

      return result;
    }),
  );
}

export async function logAccounts(
  label: string,
  archanovaAccount: ArchanovaAccount,
  etherspotAccount: EtherspotAccount,
): Promise<void> {
  console.log(' ');

  logLabel(label);

  await logAccount('Archanova', archanovaAccount, archanovaAccount);

  console.log(' ');

  await logAccount('ETHERspot', archanovaAccount, etherspotAccount);

  console.log(' ');
}

export async function topUpAccount(
  account: Account,
  value: BigNumberish,
  token?: Contract,
): Promise<BigNumber> {
  if (typeof value === 'string') {
    value = utils.parseEther(value);
  }

  switch (token) {
    case erc20Token1: {
      const tx = await erc20Token1.depositTo(account.address, {
        value,
      });

      await tx.wait();
      break;
    }

    case erc20Token2: {
      const tx = await erc20Token2.mint(value);
      await tx.wait();

      {
        const tx = await erc20Token2.transfer(account.address, value);
        await tx.wait();
      }
      break;
    }

    default: {
      const tx = await sender.sendTransaction({
        to: account.address,
        value,
      });

      await tx.wait();
    }
  }

  return BigNumber.from(value);
}
