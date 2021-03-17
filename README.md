# ETHERspot archanova migrator

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Installation

```bash
$ npm i
$ npm run lerna:bootstrap
```

## Packages

* **[migrator](./packages/migrator) - main migrator package**
* [migrator-benchmark](./packages/migrator-benchmark) - migrator benchmark
* [contracts-common](./packages/contracts-common) - common contracts
* [contracts-migrator](./packages/contracts-migrator) - migrator contracts
* [contracts-platform](./packages/contracts-platform) - archanova contracts

## Benchmark

## Usage

1. Start [local infra](https://github.com/etherspot/etherspot-infra)
2. Setup envs
   ```bash
   export LOCAL_A_PROVIDER_PRIVATE_KEY=0x... # use infra account deployer private key
   export LOCAL_A_PROVIDER_ENDPOINT=http://localhost:8545
   export BENCHMARK_ERC20_TOKENS_COUNT=25
   ```
3. Deploy contracts to `localnets`
   ```bash
   $ npm run deploy:localA
   $ npm run deploy:localB
   ```
4. Build packages
   ```bash
   $ npm run build
   ```
5. Run benchmark
   ```bash
   $ npm run migrator:benchmark
   ```
   output can be found [here](./BENCHMARK.md).

## License

MIT
