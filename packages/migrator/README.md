# ETHERspot archanova migrator

## Installation

```bash
$ npm i @etherspot/archanova-migrator -S
```

## Usage

```typescript
import { Migrator } from '@etherspot/archanova-migrator';
import { utils } from 'ethers';

let migrator = new Migrator({
  chainId: 42, // optional, default 1 - mainnet
  archanovaAccount: '0x...', 
  etherspotAccount: '0x...'
});

// each migration step is optional
migrator = migrator
  .addAccountDevice()
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
  .transferENSNode(utils.namehash('example.eth'))

const signature: string; // personal sign `migrator.migrationMessage` with archanova account owner device

// encode migration into archanova account transaction args
migrator.encodeArchanovaAccountTransactionArgs(signature);

// encode migration into transaction requests
migrator.encodeTransactionRequests(signature);

```

## License

MIT
