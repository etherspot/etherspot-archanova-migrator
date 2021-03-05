# ETHERspot archanova migrator

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Installation

```bash
$ npm i
$ npm run bootstrap
```

## Packages

* **[migrator](./packages/migrator) - migrator package**
* [migrator-example](./packages/migrator-example) - migrator example
* [contracts-common](./packages/contracts-common) - common contracts package
* [contracts-migrator](./packages/contracts-migrator) - migrator contracts
* [contracts-platform](./packages/contracts-platform) - archanova contracts

## Running example

### Configuration

1. Start [local infra](https://github.com/etherspot/etherspot-infra)
2. Setup envs
   ```bash
   export LOCAL_A_PROVIDER_PRIVATE_KEY=0x... # use infra deployer private key
   export LOCAL_A_PROVIDER_ENDPOINT=http://localhost:8545
   export OMIT_MIGRATE_BALANCE=0        # off by default
   export OMIT_MIGRATE_ERC20_TOKEN_1=0  # off by default
   export OMIT_MIGRATE_ERC20_TOKEN_2=0  # off by default
   export OMIT_MIGRATE_ENS_NAME=0       # off by default
   ```
3. Deploy contracts to localnets
   ```bash
   $ npm run deploy:localA
   $ npm run deploy:localB
   ```
4. Build packages
   ```bash
   $ npm run build
   ```
5. Run example
   ```bash
   $ npm run migrator-example:start
   ```

   ```
   * State before migration
   
     Archanova account
     -----------------
     address: 0x24Cd057399e26BB0171dAB4a32C5AdD482856193
     balance (wei): 20000000000000000000
     balance (ERC20 token #1): 12223000000000000
     balance (ERC20 token #2): 2140
     ensName: account1614959677.archanova-v2
   
     ETHERspot account
     -----------------
     address: 0xa5fd00348Ab9f34b42F9377ef819D5A9d14dA5cF
     balance (wei): 0
     balance (ERC20 token #1): 0
     balance (ERC20 token #2): 0
     ensName: -
   
   * Migration
   
     #1 Transaction request gas usage: 49832
     #2 Transaction request gas usage: 235728
   
   * State after migration
   
     Archanova account
     -----------------
     address: 0x24Cd057399e26BB0171dAB4a32C5AdD482856193
     balance (wei): 0
     balance (ERC20 token #1): 0
     balance (ERC20 token #2): 0
     ensName: -
   
     ETHERspot account
     -----------------
     address: 0xa5fd00348Ab9f34b42F9377ef819D5A9d14dA5cF
     balance (wei): 20000000000000000000
     balance (ERC20 token #1): 12223000000000000
     balance (ERC20 token #2): 2140
     ensName: account1614959677.archanova-v2
   ```

## License

MIT
