import { MigrationToken, Migrator } from '@etherspot/archanova-migrator';
import { chainId } from './constants';
import {
  randomArchanovaAccount,
  randomERC20Token,
  randomEtherspotAccount,
  randomAmount,
  topUpAccount,
} from './utils';
import { config } from './config';
import { Logger } from './logger';

async function main(): Promise<void> {
  const { erc20TokensCount, outputFile } = config;

  const logger = new Logger(outputFile);

  await logger.reset();

  await logger.log(
    'transfer balance', //
    'transfer ENS',
    'transfer ERC20 (count)',
    '#1 tx (gas used)',
    '#2 tx (gas used)',
  );

  await logger.log(
    '---', //
    '---',
    '---',
    '---',
    '---',
  );

  for (let a = 0; a < 2; a++) {
    for (let b = 0; b < 2; b++) {
      for (
        let migrateERC20TokensCount = 0;
        migrateERC20TokensCount <= erc20TokensCount;
        migrateERC20TokensCount++
      ) {
        const migrateBalance = !a;
        const migrateENS = !b;

        if ((migrateBalance && migrateENS) || migrateERC20TokensCount) {
          const logArgs: any[] = [];

          const archanovaAccount = await randomArchanovaAccount();
          const etherspotAccount = randomEtherspotAccount();

          let migrator = new Migrator({
            chainId,
            archanovaAccount: archanovaAccount.address,
            etherspotAccount: etherspotAccount.address,
          });

          const { ensName, device } = archanovaAccount;

          migrator.addAccountDevice();

          if (migrateBalance) {
            const balance = await topUpAccount(
              archanovaAccount,
              randomAmount(),
            );

            migrator.transferBalance(balance);
            logArgs.push(true);
          } else {
            logArgs.push(false);
          }

          if (migrateENS) {
            migrator.transferENSNode(ensName);
            logArgs.push(true);
          } else {
            logArgs.push(false);
          }

          if (migrateERC20TokensCount > 0) {
            const migrationTokens: MigrationToken[] = [];

            for (let i = 0; i < migrateERC20TokensCount; i++) {
              const erc20Token = randomERC20Token();
              const amount = await topUpAccount(
                archanovaAccount,
                randomAmount(),
                erc20Token,
              );

              migrationTokens.push({
                amount,
                token: erc20Token.address,
              });
            }

            migrator.transferERC20Tokens(migrationTokens);
          }

          logArgs.push(migrateERC20TokensCount);

          await topUpAccount(archanovaAccount.device, '1');

          const archanovaAccountDeviceSignature = await device.signMessage(
            migrator.migrationMessage,
          );

          const txRequests = migrator.encodeTransactionRequests(
            archanovaAccountDeviceSignature,
          );

          for (const txRequest of txRequests) {
            const tx = await archanovaAccount.device.sendTransaction(txRequest);
            const { gasUsed } = await tx.wait();

            logArgs.push(gasUsed.toNumber());
          }

          await logger.log(...logArgs);
        }
      }
    }
  }
}

main().catch(console.error);
