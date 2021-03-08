import { MigrationToken, Migrator } from '@etherspot/archanova-migrator';
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
import { config } from './config';

async function main(): Promise<void> {
  const {
    migrateBalance,
    migrateERC20Token1,
    migrateERC20Token2,
    migrateENSName,
  } = config;

  if (
    !migrateBalance &&
    !migrateERC20Token1 &&
    !migrateERC20Token2 &&
    !migrateENSName
  ) {
    return;
  }

  const archanovaAccount = await createArchanovaAccount();
  const etherspotAccount = createEtherspotAccount();

  // top-up account device account
  await topUpAccount(archanovaAccount.device, '1');

  const balanceWei = await topUpAccount(archanovaAccount, '20');
  const balanceERCToken1 = await topUpAccount(
    archanovaAccount,
    '0.012223',
    erc20Token1,
  );
  const balanceERCToken2 = await topUpAccount(
    archanovaAccount,
    2140,
    erc20Token2,
  );

  await logAccounts(
    'State before migration',
    archanovaAccount,
    etherspotAccount,
  );

  let migrator = new Migrator({
    chainId,
    archanovaAccount: archanovaAccount.address,
    etherspotAccount: etherspotAccount.address,
  });

  const { ensName, device } = archanovaAccount;

  const archanovaAccountDeviceSignature = await device.signMessage(
    migrator.migrationMessage,
  );

  migrator.addAccountDevice();

  if (migrateBalance) {
    migrator.transferBalance(balanceWei);
  }

  if (migrateERC20Token1 || migrateERC20Token2) {
    const migrationTokens: MigrationToken[] = [];

    if (migrateERC20Token1) {
      migrationTokens.push({
        token: erc20Token1.address,
        amount: balanceERCToken1,
      });
    }
    if (migrateERC20Token2) {
      migrationTokens.push({
        token: erc20Token2.address,
        amount: balanceERCToken2,
      });
    }

    migrator.transferERC20Tokens(migrationTokens);
  }

  if (migrateENSName) {
    migrator.transferENSNode(ensName);
  }

  const txRequests = migrator.encodeTransactionRequests(
    archanovaAccountDeviceSignature,
  );

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
