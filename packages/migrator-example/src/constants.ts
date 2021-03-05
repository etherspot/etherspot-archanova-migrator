import { BigNumber, providers, utils, Wallet } from 'ethers';

const {
  LOCAL_A_PROVIDER_ENDPOINT, //
  LOCAL_A_PROVIDER_PRIVATE_KEY,
} = process.env;

export const provider = new providers.JsonRpcProvider(
  LOCAL_A_PROVIDER_ENDPOINT,
);
export const sender = new Wallet(LOCAL_A_PROVIDER_PRIVATE_KEY, provider);
export const chainId = 9999;
export const gasPrice = BigNumber.from(20 * 1000000000); // 20 gwei
export const ensRootName = 'archanova-v2';
export const ensRootNameHash = utils.namehash(ensRootName);
