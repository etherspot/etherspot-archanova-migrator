import { HardhatUserConfig } from 'hardhat/config';
import {
  NetworkNames,
  NETWORK_NAME_TO_CHAIN_ID,
  NETWORK_CHAIN_ID_TO_NAME,
} from './constants';

export function getNetworkChainId(networkName: NetworkNames): number {
  return NETWORK_NAME_TO_CHAIN_ID[networkName];
}

export function getNetworkName(chainId: string | number): NetworkNames {
  let result: NetworkNames = null;

  chainId = parseInt(`${chainId}`, 10);

  if (chainId) {
    result = NETWORK_CHAIN_ID_TO_NAME[chainId] || null;
  }

  return result;
}

export function getNetworkEnvPrefix(networkName: NetworkNames): string {
  return networkName.replace(/([A-Z])+/, '_$1').toUpperCase();
}

export function getProviderUrl(
  networkName: NetworkNames,
  defaultProvider?: 'infura' | string,
): string {
  const envPrefix = getNetworkEnvPrefix(networkName);

  let result = process.env[`${envPrefix}_PROVIDER_ENDPOINT`];

  if (!result) {
    switch (defaultProvider) {
      case 'infura':
        result = `https://${networkName}.infura.io/v3/${process.env.INFURA_TOKEN}`;
        break;

      default:
        result = defaultProvider;
    }
  }

  return result;
}

export function createConfigNetwork(
  networkName: NetworkNames,
  chainId: number,
  defaultProvider?: 'infura' | string,
  defaultGasPrice?: number,
): HardhatUserConfig['networks'] {
  const url = getProviderUrl(networkName);
  const envPrefix = getNetworkEnvPrefix(networkName);

  let gasPrice =
    parseInt(process.env[`${envPrefix}_PROVIDER_GAS_PRICE`], 10) || undefined;

  if (!gasPrice && defaultGasPrice) {
    gasPrice = defaultGasPrice;
  }

  if (gasPrice) {
    gasPrice *= 1000000000;
  }

  const privateKey = process.env[`${envPrefix}_PROVIDER_PRIVATE_KEY`];
  const accounts = privateKey ? [privateKey] : [];

  return url
    ? {
        [networkName]: {
          chainId,
          url,
          accounts,
          gasPrice,
        },
      }
    : {};
}
