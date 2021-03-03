import {
  ContractNames,
  getContractAddress,
  getContractAbi,
} from '@etherspot/archanova-contracts-platform';
import { Migrator } from '@etherspot/archanova-migrator';
import {
  BigNumberish,
  Contract,
  providers,
  constants,
  Wallet,
  ContractTransaction,
} from 'ethers';

const { LOCAL_A_PROVIDER_ENDPOINT, LOCAL_A_PROVIDER_PRIVATE_KEY } = process.env;

async function main(): Promise<void> {
  const provider = new providers.JsonRpcProvider(LOCAL_A_PROVIDER_ENDPOINT);
  const wallet = new Wallet(LOCAL_A_PROVIDER_PRIVATE_KEY, provider);
  const device = Wallet.createRandom().connect(provider);
  const etherspotAccount = Wallet.createRandom().address;

  const { chainId } = await provider.getNetwork();
  const gasPrice = await provider.getGasPrice();

  const logAccount = async (name: string, address: string) => {
    console.log(`${name} account`);
    console.log('  address:', address);
    console.log(
      '  balance:',
      await provider.getBalance(address).then(v => v.toString()),
    );
    console.log();
  };

  const accountProviderV1: Contract &
    Partial<{
      unsafeCreateAccount(
        accountId: BigNumberish,
        device: string,
        ensLabel: string,
        ensNode: string,
        refundGas: BigNumberish,
      ): Promise<ContractTransaction>;
    }> = new Contract(
    getContractAddress(ContractNames.AccountProviderV1, chainId),
    getContractAbi(ContractNames.AccountProviderV1),
    wallet,
  );

  const tx1 = await accountProviderV1.unsafeCreateAccount(
    Date.now(),
    device.address,
    constants.HashZero,
    constants.HashZero,
    0,
  );

  const { events } = await tx1.wait();
  const {
    args: { account: archanovaAccount },
  } = events.find(({ event }) => event === 'AccountCreated');

  const tx2 = await wallet.sendTransaction({
    to: archanovaAccount,
    value: 1000,
  });

  await tx2.wait();

  await logAccount('archanova', archanovaAccount);
  await logAccount('etherspot', etherspotAccount);

  const migrator = new Migrator({
    chainId,
    archanovaAccount,
    etherspotAccount,
  });

  const txRequests = migrator
    .addAccountDevice()
    .transferBalance(1000)
    .encodeTransactionRequests(
      await device.signMessage(migrator.migrationMessage),
    );

  for (const { to, data } of txRequests) {
    const gasLimit = await device.estimateGas({
      to,
      data,
      gasPrice,
    });

    const tx1 = await wallet.sendTransaction({
      to: device.address,
      value: gasPrice.mul(gasLimit),
      gasPrice,
    });

    await tx1.wait();

    const tx2 = await device.sendTransaction({
      to,
      data,
      gasLimit,
      gasPrice,
    });

    await tx2.wait();

    console.log('gas limit:', gasLimit.toString());
  }

  console.log();

  await logAccount('archanova', archanovaAccount);
  await logAccount('etherspot', etherspotAccount);
}

main().catch(console.error);
