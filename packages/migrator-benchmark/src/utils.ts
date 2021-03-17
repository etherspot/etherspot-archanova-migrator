import { BigNumber, BigNumberish, Contract, utils, Wallet } from 'ethers';
import { accountProvider, erc20Token1, erc20Token2 } from './contracts';
import { provider, ensRootName, ensRootNameHash, sender } from './constants';
import { Account, ArchanovaAccount, EtherspotAccount } from './interfaces';

let accountCounter = Date.now();

export async function randomArchanovaAccount(): Promise<ArchanovaAccount> {
  const id = ++accountCounter;
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

export function randomEtherspotAccount(): EtherspotAccount {
  const address = utils.getAddress(utils.hexlify(utils.randomBytes(20)));

  return {
    address,
  };
}

export function randomERC20Token(): Contract {
  return Math.random() < 0.5 ? erc20Token1 : erc20Token2;
}

export function randomAmount(): number {
  return Math.floor(Math.random() * 10000000);
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
