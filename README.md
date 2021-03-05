# ETHERspot archanova migrator

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

1. Start [local infra](https://github.com/etherspot/etherspot-infra)
2. Setup envs
   ```base
   export LOCAL_A_PROVIDER_PRIVATE_KEY=0x... # use infra deployer private key
   export LOCAL_A_PROVIDER_ENDPOINT=http://localhost:8545
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

## License

MIT
