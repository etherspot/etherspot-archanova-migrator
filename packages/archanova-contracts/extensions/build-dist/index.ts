import { task } from 'hardhat/config';
import {
  readdir,
  readFile,
  readJSON,
  writeFile,
  pathExists,
  mkdirp,
} from 'fs-extra';
import { utils } from 'ethers';
import { resolve, join } from 'path';
import { NetworkNames } from '../constants';
import templates from './templates';
import { pillarDist, pillarAccountByteCodeHashes } from './resources';

const TASK_BUILD_DIST = 'build-dist';

task(TASK_BUILD_DIST, 'Build dist', async (args, hre) => {
  const {
    config: { buildPaths, paths },
  } = hre;

  let { artifacts: artifactsPath, dist: distPath } = {
    artifacts: 'artifacts',
    dist: 'dist',
    ...(buildPaths || {}),
  };

  let { deployments: deploymentsPath } = {
    ...paths,
    deployments: 'deployments',
  };

  const cwd = process.cwd();

  artifactsPath = resolve(cwd, artifactsPath);
  distPath = resolve(cwd, distPath);
  deploymentsPath = resolve(cwd, deploymentsPath);

  if ((await pathExists(artifactsPath)) && (await pathExists(distPath))) {
    await mkdirp(distPath);

    const networks: { name: string; chainId: string; path?: string }[] = [
      {
        name: NetworkNames.Mainnet,
        chainId: '1',
      },
      {
        name: NetworkNames.Ropsten,
        chainId: '3',
      },
      {
        name: NetworkNames.Kovan,
        chainId: '42',
      },
    ];

    const dirNames = await readdir(deploymentsPath);

    for (const name of dirNames) {
      const path = join(deploymentsPath, name);
      const chainFilePath = join(path, '.chainId');

      if (await pathExists(chainFilePath)) {
        const chainId = await readFile(chainFilePath, 'utf8');

        networks.push({
          name,
          chainId,
          path,
        });
      }
    }

    const contracts: {
      [key: string]: {
        abi: any;
        addresses: { [key: string]: string };
        byteCodeHashes: { [key: string]: string };
      };
    } = {};

    const fileNames = await readdir(artifactsPath);

    for (const fileName of fileNames) {
      if (fileName.endsWith('.json')) {
        const contractName = fileName.slice(0, -5);
        const filePath = join(artifactsPath, fileName);

        const addresses: { [key: string]: string } = {};
        const byteCodeHashes: { [key: string]: string } = {};

        const {
          abi,
          bytecode: byteCode,
        }: { abi: any; bytecode: string } = await readJSON(filePath);

        for (const network of networks) {
          const { chainId, path } = network;
          let address: string = null;
          let byteCodeHash: string = null;
          let transactionHash: string = null;

          if (path) {
            byteCodeHash = utils.id(byteCode);
            try {
              ({ address, transactionHash } = await readJSON(
                join(path, fileName),
              ));
            } catch (err) {
              address = null;
            }
          } else {
            if (contractName === 'Account') {
              byteCodeHash = pillarAccountByteCodeHashes[chainId] || null;
            }

            if (pillarDist[contractName]) {
              address = pillarDist[contractName].addresses[chainId];
            }
          }

          addresses[chainId] = address;
          byteCodeHashes[chainId] = byteCodeHash;
        }

        contracts[contractName] = {
          abi,
          addresses,
          byteCodeHashes,
        };
      }
    }

    const contractNames = Object.keys(contracts);

    await writeFile(
      join(distPath, 'contracts.js'),
      templates.contractsJs(contracts),
    );

    await writeFile(
      join(distPath, 'constants.js'),
      templates.constantsJs(contractNames),
    );

    await writeFile(
      join(distPath, 'constants.d.ts'),
      templates.constantsDts(contractNames),
    );

    console.log('Dist built successfully');
  }
});
