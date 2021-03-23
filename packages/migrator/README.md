# ETHERspot archanova migrator

[![NPM version][npm-image]][npm-url]

## Installation

```bash
$ npm i ethers@^5.0.8 -S
$ npm i @etherspot/archanova-migrator -S
```

## Usage

```typescript
import { Migrator } from '@etherspot/archanova-migrator';
import { utils, Wallet } from 'ethers';

let migrator = new Migrator({
  chainId: 42, // optional, default 1 - mainnet
  archanovaAccount: '0x...', 
  etherspotAccount: '0x...'
});

const archanovaAccountDevice = Wallet.createRandom();

// each migration step is optional
migrator = migrator
  .addAccountDevice() // adds the migrator as an archanova account owner device
  .transferBalance(utils.parseEther('0.05'))
  .transferERC20Tokens([
    { 
      token: '0x...', 
      amount: 1,
    },
    {
      token: '0x...',
      amount: '0x02',
    },
  ])
  .transferERC721Tokens([
    { 
      token: '0x...', 
      id: 1,
    },
    {
      token: '0x...',
      id: '0x02',
    },
  ])
  .transferENSName(utils.namehash('example.eth'))

// personal sign `migrator.migrationMessage` with archanova account owner device
const archanovaAccountDeviceSignature = await archanovaAccountDevice.signMessage(migrator.migrationMessage);

// encode migration into archanova account transaction args
migrator.encodeArchanovaAccountTransactionArgs(archanovaAccountDeviceSignature);
// [ 
//   '0x...', 0, '0x...', 
//   '0x...', 0, '0x...', 
// ]

// encode migration into transaction requests
migrator.encodeTransactionRequests(archanovaAccountDeviceSignature);
// [
//   { to: '0x...', data: '0x...' },
//   { to: '0x...', data: '0x...' },
// ]

```

## License

MIT

[npm-image]: https://badge.fury.io/js/%40etherspot%2Farchanova-migrator.svg
[npm-url]: https://npmjs.org/package/@etherspot/archanova-migrator
