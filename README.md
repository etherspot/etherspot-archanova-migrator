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
2. Deploy contracts to localnets
   ```bash
   $ npm run deploy:localA
   $ npm run deploy:localB
   ```
3. Build packages
   ```bash
   $ npm run build
   ```
3. Run example
   ```bash
   $ npm run migrator-example:start
   ```

## License

MIT
