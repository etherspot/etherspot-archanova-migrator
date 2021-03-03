import { HardhatUserConfig } from 'hardhat/config';
import {
  NetworkNames,
  createConfigNetwork,
} from '@etherspot/archanova-contracts-common';

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
    ...createConfigNetwork(NetworkNames.Mainnet, 1, 'infura'),
    ...createConfigNetwork(NetworkNames.Ropsten, 3, 'infura', 1),
    ...createConfigNetwork(NetworkNames.Kovan, 42, 'infura', 1),
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
    version: '0.6.12',
    settings: {
      evmVersion: 'istanbul',
      metadata: {
        bytecodeHash: 'none',
      },
    },
  },
};

module.exports = config;
