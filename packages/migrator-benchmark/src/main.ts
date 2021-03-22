import {
  MigrationERC20Token,
  MigrationERC721Token,
  Migrator,
} from '@etherspot/archanova-migrator';
import { chainId } from './constants';
import {
  randomArchanovaAccount,
  randomEtherspotAccount,
  randomAmount,
  topUpAccount,
  mintERC20Token,
  mintERC721Token,
} from './utils';
import { config } from './config';
import { Output } from './output';

async function main(): Promise<void> {
  const { erc20TokensCount, erc721TokensCount, outputFile } = config;

  const output = new Output(outputFile);

  await output.reset();

  await output.write(
    'transfer balance', //
    'transfer ENS',
    'transfer ERC20 (total)',
    'transfer ERC721 (total)',
    '#1 tx (gas used)',
    '#2 tx (gas used)',
  );

  await output.write(
    '---', //
    '---',
    '---',
    '---',
    '---',
    '---',
  );

  for (let a = 0; a < 2; a++) {
    for (let b = 0; b < 2; b++) {
      const migrateBalance = !a;
      const migrateENS = !b;

      for (
        let migrateERC20TokensCount = 0;
        migrateERC20TokensCount <= erc20TokensCount;
        migrateERC20TokensCount++
      ) {
        for (
          let migrateERC721TokensCount = 0;
          migrateERC721TokensCount <= erc721TokensCount;
          migrateERC721TokensCount++
        ) {
          if (
            migrateBalance ||
            migrateENS ||
            migrateERC20TokensCount ||
            migrateERC721TokensCount
          ) {
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
              migrator.transferENSName(ensName);
              logArgs.push(true);
            } else {
              logArgs.push(false);
            }

            if (migrateERC20TokensCount > 0) {
              const tokens: MigrationERC20Token[] = [];

              for (let i = 0; i < migrateERC20TokensCount; i++) {
                tokens.push(await mintERC20Token(archanovaAccount));
              }

              migrator.transferERC20Tokens(tokens);
            }

            logArgs.push(migrateERC20TokensCount);

            if (migrateERC721TokensCount > 0) {
              const tokens: MigrationERC721Token[] = [];

              for (let i = 0; i < migrateERC721TokensCount; i++) {
                tokens.push(await mintERC721Token(archanovaAccount));
              }

              migrator.transferERC721Tokens(tokens);
            }

            logArgs.push(migrateERC721TokensCount);

            await topUpAccount(archanovaAccount.device, '1');

            const archanovaAccountDeviceSignature = await device.signMessage(
              migrator.migrationMessage,
            );

            const txRequests = migrator.encodeTransactionRequests(
              archanovaAccountDeviceSignature,
            );

            for (const txRequest of txRequests) {
              try {
                const tx = await archanovaAccount.device.sendTransaction(
                  txRequest,
                );

                const { gasUsed } = await tx.wait();

                logArgs.push(gasUsed.toNumber());
              } catch (err) {
                logArgs.push(err);
              }
            }

            await output.write(...logArgs);
          }
        }
      }
    }
  }
}

main().catch(console.error);
