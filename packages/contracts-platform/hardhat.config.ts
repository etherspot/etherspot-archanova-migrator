import { HardhatUserConfig } from 'hardhat/config';
import {
  NetworkNames,
  createConfigNetwork,
} from '@etherspot/archanova-contracts-common';
import { knownContracts } from './config';

const { HARDHAT_MNEMONIC } = process.env;

const config: HardhatUserConfig = {
  namedAccounts: {
    from: 0,
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic:
          HARDHAT_MNEMONIC ||
          'test test test test test test test test test test test junk',
        count: 256,
      },
      chainId: 192,
      gasPrice: 20 * 1000000000,
    },
    ...createConfigNetwork(
      NetworkNames.LocalA,
      9999,
      'http://localhost:8545',
      20,
    ),
    ...createConfigNetwork(
      NetworkNames.LocalB,
      6666,
      'http://localhost:9545',
      20,
    ),
  },
  solidity: {
    compilers: [
      {
        version: '0.5.17',
        settings: {
          evmVersion: 'istanbul',
        },
      },
      {
        version: '0.6.12',
        settings: {
          evmVersion: 'istanbul',
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
    ],
  },
  external: {
    contracts: [
      {
        artifacts: 'node_modules/@etherspot/contracts/artifacts',
      },
    ],
    deployments: {
      localA: ['node_modules/@etherspot/contracts/deployments/localA'],
      localB: ['node_modules/@etherspot/contracts/deployments/localB'],
    },
  },
  knownContracts,
};

module.exports = config;
