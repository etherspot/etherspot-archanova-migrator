import { Migrator } from '@etherspot/archanova-migrator';
import { chainId, gasPrice } from './constants';
import { erc20Token1, erc20Token2 } from './contracts';
import {
  createArchanovaAccount,
  createEtherspotAccount,
  logAccounts,
  logMessage,
  logLabel,
  topUpAccount,
} from './utils';

async function main(): Promise<void> {
  const archanovaAccount = await createArchanovaAccount();
  const etherspotAccount = createEtherspotAccount();

  // top-up account device account
  await topUpAccount(archanovaAccount.device, '1');

  const balanceWei = await topUpAccount(archanovaAccount, '20');
  const balanceERCToken1 = await topUpAccount(
    archanovaAccount,
    4000,
    erc20Token1,
  );
  const balanceERCToken2 = await topUpAccount(
    archanovaAccount,
    122,
    erc20Token2,
  );

  await logAccounts(
    'State before migration',
    archanovaAccount,
    etherspotAccount,
  );

  const migrator = new Migrator({
    chainId,
    archanovaAccount: archanovaAccount.address,
    etherspotAccount: etherspotAccount.address,
  });

  const { ensName, device } = archanovaAccount;

  const archanovaAccountDeviceSignature = await device.signMessage(
    migrator.migrationMessage,
  );

  const txRequests = migrator
    .addAccountDevice()
    .transferBalance(balanceWei)
    .transferERC20Tokens([
      {
        token: erc20Token1.address,
        amount: balanceERCToken1,
      },
      {
        token: erc20Token2.address,
        amount: balanceERCToken2,
      },
    ])
    .transferENSNode(ensName)
    .encodeTransactionRequests(archanovaAccountDeviceSignature);

  let txRequestIndex = 0;

  logLabel('Migration');

  for (const { to, data } of txRequests) {
    const tx = await device.sendTransaction({
      to,
      data,
      gasPrice,
    });

    const { gasUsed } = await tx.wait();

    logMessage(
      `#${++txRequestIndex} Transaction request gas usage:`,
      gasUsed.toString(),
    );
  }

  await logAccounts(
    'State after migration',
    archanovaAccount,
    etherspotAccount,
  );
}

main().catch(console.error);
