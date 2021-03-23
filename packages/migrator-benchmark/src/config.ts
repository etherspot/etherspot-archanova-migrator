import { resolve } from 'path';

const {
  LOCAL_A_PROVIDER_ENDPOINT, //
  LOCAL_A_PROVIDER_PRIVATE_KEY,
  BENCHMARK_ERC20_TOKENS_COUNT,
  BENCHMARK_ERC721_TOKENS_COUNT,
} = process.env;

function parseIntEnv(name: string, defaultValue = 0): number {
  let result = parseInt(name, 10);

  if (!(result >= 0)) {
    result = defaultValue;
  }

  return result;
}

export const config = {
  providerUrl: LOCAL_A_PROVIDER_ENDPOINT,
  providerPrivateKey: LOCAL_A_PROVIDER_PRIVATE_KEY,
  erc20TokensCount: parseIntEnv(BENCHMARK_ERC20_TOKENS_COUNT, 2),
  erc721TokensCount: parseIntEnv(BENCHMARK_ERC721_TOKENS_COUNT, 2),
  outputFile: resolve(__dirname, '../../../BENCHMARK.md'),
};
