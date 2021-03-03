import {
  KnownContractsConfig,
  getNetworkName,
} from '@etherspot/archanova-contracts-common';
import { pillarDist, pillarAccountByteCodeHashes } from './resources';

const knownContracts: KnownContractsConfig = {};

// addresses
{
  const entries = Object.entries(pillarDist);

  for (const entry of entries) {
    let contractName = entry[0];

    switch (contractName) {
      case 'Guardian':
        contractName = 'Account';
        break;
    }

    const addresses = Object.entries(entry[1].addresses);

    for (const [chainId, address] of addresses) {
      const networkName = getNetworkName(chainId);

      if (networkName && address) {
        if (!knownContracts[contractName]) {
          knownContracts[contractName] = {};
        }

        knownContracts[contractName][networkName] = {
          address,
          byteCodeHash: null,
        };
      }
    }
  }
}

// byte code hashes
{
  const entries = Object.entries(pillarAccountByteCodeHashes);

  for (const [chainId, byteCodeHash] of entries) {
    const networkName = getNetworkName(chainId);

    if (networkName) {
      knownContracts.Account[networkName].byteCodeHash = byteCodeHash;
    }
  }
}

export { knownContracts };
