import { BigNumber, providers, utils, Wallet } from 'ethers';
import { config } from './config';

export const provider = new providers.JsonRpcProvider(config.providerUrl);
export const sender = new Wallet(config.providerPrivateKey, provider);
export const chainId = 9999;
export const gasPrice = BigNumber.from(20 * 1000000000); // 20 gwei
export const ensRootName = 'archanova-v2';
export const ensRootNameHash = utils.namehash(ensRootName);
