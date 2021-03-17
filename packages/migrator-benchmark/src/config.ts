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
  BENCHMARK_ERC20_TOKENS_COUNT,
} = process.env;

export const config: Config = {
  providerUrl: LOCAL_A_PROVIDER_ENDPOINT,
  providerPrivateKey: LOCAL_A_PROVIDER_PRIVATE_KEY,
  erc20TokensCount: parseInt(BENCHMARK_ERC20_TOKENS_COUNT, 10) || 25,
  outputFile: resolve(__dirname, '../../../BENCHMARK.md'),
};
