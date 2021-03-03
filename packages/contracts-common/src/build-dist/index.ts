import { task } from 'hardhat/config';
import { readdir, readJSON, writeFile, pathExists, mkdirp } from 'fs-extra';
import { utils } from 'ethers';
import { resolve, join } from 'path';
import { NetworkNames } from '../constants';
import { getNetworkChainId } from '../utils';
import templates from './templates';

const TASK_BUILD_DIST = 'build-dist';

task(TASK_BUILD_DIST, 'Build dist', async (args, hre) => {
  const { config } = hre;

  const { buildPaths, paths } = config;
  let { knownContracts } = config;

  if (!knownContracts) {
    knownContracts = {};
  }

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

  if (await pathExists(artifactsPath)) {
    await mkdirp(distPath);

    const networks: { name: string; chainId: string; path: string }[] = [];
    const networkNames = Object.values(NetworkNames);

    for (const networkName of networkNames) {
      const chainId = getNetworkChainId(networkName);
      let path = join(deploymentsPath, networkName);

      if (chainId) {
        if (!(await pathExists(path))) {
          path = null;
        }

        networks.push({
          path,
          chainId: `${chainId}`,
          name: networkName,
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
          let address: string = null;
          let byteCodeHash: string = null;
          let transactionHash: string = null;

          if (network.path) {
            byteCodeHash = utils.id(byteCode);
            try {
              ({ address, transactionHash } = await readJSON(
                join(network.path, fileName),
              ));
            } catch (err) {
              address = null;
            }
          } else if (
            knownContracts[contractName] &&
            knownContracts[contractName][network.name]
          ) {
            ({ address, byteCodeHash } = {
              address: null,
              byteCodeHash: null,
              ...knownContracts[contractName][network.name],
            });
          }

          addresses[network.chainId] = address;
          byteCodeHashes[network.chainId] = byteCodeHash;
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
      join(distPath, 'constants.d.ts'),
      templates.constantsTs(contractNames),
    );

    await writeFile(
      join(distPath, 'constants.js'),
      templates.constantsJs(contractNames),
    );

    await writeFile(
      join(distPath, 'contracts.js'),
      templates.contractsJs(contracts),
    );

    await writeFile(join(distPath, 'helpers.d.ts'), templates.helpersTs());
    await writeFile(join(distPath, 'helpers.js'), templates.helpersJs());

    await writeFile(join(distPath, 'index.d.ts'), templates.indexTs());
    await writeFile(join(distPath, 'index.js'), templates.indexJs());

    console.log('Dist built successfully');
  }
});
