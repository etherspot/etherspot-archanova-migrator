import { resolve } from 'path';

export interface Config {
  providerUrl: string;
  providerPrivateKey: string;
  erc20TokensCount: number;
  outputFile: string;
}

const {
  LOCAL_A_PROVIDER_ENDPOINT, //
  LOCAL_A_PROVIDER_PRIVATE_KEY,
} = process.env;

export const config: Config = {
  providerUrl: LOCAL_A_PROVIDER_ENDPOINT,
  providerPrivateKey: LOCAL_A_PROVIDER_PRIVATE_KEY,
  erc20TokensCount: 25,
  outputFile: resolve(__dirname, '../../../BENCHMARK.md'),
};
