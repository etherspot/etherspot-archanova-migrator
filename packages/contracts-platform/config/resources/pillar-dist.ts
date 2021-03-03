// updated at: 2020-08-17T11:44:33.374Z

/* eslint-disable */

export const pillarDist: {
  [key: string]: {
    abi: any;
    byteCodeHash: string;
    addresses: { [key: string]: string };
  };
} = {
  Account: {
    abi: [
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        name: 'devices',
        outputs: [
          {
            name: 'isOwner',
            type: 'bool',
          },
          {
            name: 'exists',
            type: 'bool',
          },
          {
            name: 'existed',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xe7b4cac6',
      },
      {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
        signature: 'constructor',
      },
      {
        payable: true,
        stateMutability: 'payable',
        type: 'fallback',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'device',
            type: 'address',
          },
          {
            indexed: false,
            name: 'isOwner',
            type: 'bool',
          },
        ],
        name: 'DeviceAdded',
        type: 'event',
        signature:
          '0x3525178f8d4a5c0dc1e61a0ede8d6a7a9ea67a23ec515983bbb940be4b419650',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'device',
            type: 'address',
          },
        ],
        name: 'DeviceRemoved',
        type: 'event',
        signature:
          '0x15c62ec158a6c18af42b447791266b9b0764ba2a6df610890d4da85c3d4185db',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'recipient',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
          {
            indexed: false,
            name: 'data',
            type: 'bytes',
          },
          {
            indexed: false,
            name: 'response',
            type: 'bytes',
          },
        ],
        name: 'TransactionExecuted',
        type: 'event',
        signature:
          '0x012ae8711b8dc37e405d8e422569d1ee78d52d76bc8fe2a9ea81ffe17569e51a',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_device',
            type: 'address',
          },
          {
            name: '_isOwner',
            type: 'bool',
          },
        ],
        name: 'addDevice',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x811d54dc',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_device',
            type: 'address',
          },
        ],
        name: 'removeDevice',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x1f7b6324',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_recipient',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
          {
            name: '_data',
            type: 'bytes',
          },
        ],
        name: 'executeTransaction',
        outputs: [
          {
            name: '_response',
            type: 'bytes',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x3f579f42',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_data',
            type: 'bytes',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'isValidSignature',
        outputs: [
          {
            name: 'magicValue',
            type: 'bytes4',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x20c13b0b',
      },
    ],
    addresses: {},
    byteCodeHash:
      '0x71d668827d20204f3ebf0ee20d26752e9f0c62844adececb2c6461b40afbb938',
  },
  AccountProvider: {
    abi: [
      {
        constant: false,
        inputs: [
          {
            name: '_rootNode',
            type: 'bytes32',
          },
        ],
        name: 'verifyEnsRootNode',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x04aa74cb',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_node',
            type: 'bytes32',
          },
        ],
        name: 'addr',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x3b3b57de',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_rootNode',
            type: 'bytes32',
          },
        ],
        name: 'addEnsRootNode',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x416ae7ff',
      },
      {
        constant: true,
        inputs: [],
        name: 'guardian',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x452a9320',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'bytes32',
          },
        ],
        name: 'ensRootNodes',
        outputs: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'verified',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x7ff4dfd0',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_rootNode',
            type: 'bytes32',
          },
        ],
        name: 'releaseEnsRootNode',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xbb223ce4',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_node',
            type: 'bytes32',
          },
          {
            name: '_addr',
            type: 'address',
          },
        ],
        name: 'setAddr',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xd5fa2b00',
      },
      {
        inputs: [
          {
            name: '_guardian',
            type: 'address',
          },
          {
            name: '_accountContractCode',
            type: 'bytes',
          },
          {
            name: '_accountProxy',
            type: 'address',
          },
          {
            name: '_ens',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
        signature: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'account',
            type: 'address',
          },
        ],
        name: 'AccountCreated',
        type: 'event',
        signature:
          '0x805996f252884581e2f74cf3d2b03564d5ec26ccc90850ae12653dc1b72d1fa2',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'account',
            type: 'address',
          },
        ],
        name: 'AccountEnsNameUpdated',
        type: 'event',
        signature:
          '0x7eaf47b80dadd049c59d75e4fea0cff3ac993d779967e004590899fb0ce321f6',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'rootNode',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'EnsRootNodeAdded',
        type: 'event',
        signature:
          '0x44a96c3928a5c6ba670970f10868d09235a6b7a5770c2ebbf244e2228e546f5c',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'rootNode',
            type: 'bytes32',
          },
        ],
        name: 'EnsRootNodeVerified',
        type: 'event',
        signature:
          '0x3c1e12021a68eb78df268e4fed874721bb38a7b278d9029db9a7b2056592baf2',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'rootNode',
            type: 'bytes32',
          },
        ],
        name: 'EnsRootNodeReleased',
        type: 'event',
        signature:
          '0xc98be4d6a6f25550c39fb4e66d7ecd9ed01b3a569eff063b00e6608270d31f3d',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'node',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'addr',
            type: 'address',
          },
        ],
        name: 'AddrChanged',
        type: 'event',
        signature:
          '0x52d7d861f09ab3d26239d492e8968629f95e9e318cf0b73bfddc441522a15fd2',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_ensLabel',
            type: 'bytes32',
          },
          {
            name: '_ensNode',
            type: 'bytes32',
          },
          {
            name: '_guardianSignature',
            type: 'bytes',
          },
        ],
        name: 'updateAccountEnsName',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x5acb1c1b',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_ensLabel',
            type: 'bytes32',
          },
          {
            name: '_ensNode',
            type: 'bytes32',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'createAccount',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xc6147fc8',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_accountId',
            type: 'uint256',
          },
          {
            name: '_device',
            type: 'address',
          },
          {
            name: '_ensLabel',
            type: 'bytes32',
          },
          {
            name: '_ensNode',
            type: 'bytes32',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
        ],
        name: 'unsafeCreateAccount',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x188b954f',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_accountProxy',
            type: 'address',
          },
        ],
        name: 'changeAccountProxy',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x26d09131',
      },
    ],
    addresses: {
      '1': '0x5913711B94F0e3c0fC933E400DF94321436163FE',
      '3': '0xa8c58f2067d30C65b53fF7745eb490d48167Ca0C',
      '4': null,
      '42': '0x9c30D61E6E1AE5c97e082C5Ee2818A379740110a',
      '65021': '0x0761B2cD55Be5C8Be0c975161b7A855B58943FbB',
    },
    byteCodeHash: null,
  },
  AccountProviderV1: {
    abi: [
      {
        constant: false,
        inputs: [
          {
            name: '_rootNode',
            type: 'bytes32',
          },
        ],
        name: 'verifyEnsRootNode',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x04aa74cb',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_node',
            type: 'bytes32',
          },
        ],
        name: 'addr',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x3b3b57de',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_rootNode',
            type: 'bytes32',
          },
        ],
        name: 'addEnsRootNode',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x416ae7ff',
      },
      {
        constant: true,
        inputs: [],
        name: 'guardian',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x452a9320',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'bytes32',
          },
        ],
        name: 'ensRootNodes',
        outputs: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'verified',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x7ff4dfd0',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_rootNode',
            type: 'bytes32',
          },
        ],
        name: 'releaseEnsRootNode',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xbb223ce4',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_node',
            type: 'bytes32',
          },
          {
            name: '_addr',
            type: 'address',
          },
        ],
        name: 'setAddr',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xd5fa2b00',
      },
      {
        inputs: [
          {
            name: '_guardian',
            type: 'address',
          },
          {
            name: '_accountContractCode',
            type: 'bytes',
          },
          {
            name: '_accountProxy',
            type: 'address',
          },
          {
            name: '_ens',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
        signature: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'account',
            type: 'address',
          },
        ],
        name: 'AccountCreated',
        type: 'event',
        signature:
          '0x805996f252884581e2f74cf3d2b03564d5ec26ccc90850ae12653dc1b72d1fa2',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'account',
            type: 'address',
          },
        ],
        name: 'AccountEnsNameUpdated',
        type: 'event',
        signature:
          '0x7eaf47b80dadd049c59d75e4fea0cff3ac993d779967e004590899fb0ce321f6',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'rootNode',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'EnsRootNodeAdded',
        type: 'event',
        signature:
          '0x44a96c3928a5c6ba670970f10868d09235a6b7a5770c2ebbf244e2228e546f5c',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'rootNode',
            type: 'bytes32',
          },
        ],
        name: 'EnsRootNodeVerified',
        type: 'event',
        signature:
          '0x3c1e12021a68eb78df268e4fed874721bb38a7b278d9029db9a7b2056592baf2',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'rootNode',
            type: 'bytes32',
          },
        ],
        name: 'EnsRootNodeReleased',
        type: 'event',
        signature:
          '0xc98be4d6a6f25550c39fb4e66d7ecd9ed01b3a569eff063b00e6608270d31f3d',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'node',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'addr',
            type: 'address',
          },
        ],
        name: 'AddrChanged',
        type: 'event',
        signature:
          '0x52d7d861f09ab3d26239d492e8968629f95e9e318cf0b73bfddc441522a15fd2',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_ensLabel',
            type: 'bytes32',
          },
          {
            name: '_ensNode',
            type: 'bytes32',
          },
          {
            name: '_guardianSignature',
            type: 'bytes',
          },
        ],
        name: 'updateAccountEnsName',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x5acb1c1b',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_ensLabel',
            type: 'bytes32',
          },
          {
            name: '_ensNode',
            type: 'bytes32',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'createAccount',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xc6147fc8',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_accountId',
            type: 'uint256',
          },
          {
            name: '_device',
            type: 'address',
          },
          {
            name: '_ensLabel',
            type: 'bytes32',
          },
          {
            name: '_ensNode',
            type: 'bytes32',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
        ],
        name: 'unsafeCreateAccount',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x188b954f',
      },
    ],
    addresses: {
      '1': '0xFAF5f5fbfe045a6De377B23aC360AE20976b6B8d',
      '3': '0x57716B1EfdeB31598E349BC3872C96ce5A94e9a3',
      '4': '0x9EE73425D7F76AB9b9247A4E4c12CD0f1f661153',
      '42': '0xB7d44461829A76147A556a61688538cb5F9F6827',
      '65021': '0xf254E687aD631A681cC895Dbdca37230D4a6f06C',
    },
    byteCodeHash: null,
  },
  AccountProviderV2: {
    abi: [
      {
        constant: false,
        inputs: [
          {
            name: '_rootNode',
            type: 'bytes32',
          },
        ],
        name: 'verifyEnsRootNode',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x04aa74cb',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_node',
            type: 'bytes32',
          },
        ],
        name: 'addr',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x3b3b57de',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_rootNode',
            type: 'bytes32',
          },
        ],
        name: 'addEnsRootNode',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x416ae7ff',
      },
      {
        constant: true,
        inputs: [],
        name: 'guardian',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x452a9320',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'bytes32',
          },
        ],
        name: 'ensRootNodes',
        outputs: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'verified',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x7ff4dfd0',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_rootNode',
            type: 'bytes32',
          },
        ],
        name: 'releaseEnsRootNode',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xbb223ce4',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_node',
            type: 'bytes32',
          },
          {
            name: '_addr',
            type: 'address',
          },
        ],
        name: 'setAddr',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xd5fa2b00',
      },
      {
        inputs: [
          {
            name: '_guardian',
            type: 'address',
          },
          {
            name: '_accountContractCode',
            type: 'bytes',
          },
          {
            name: '_accountProxy',
            type: 'address',
          },
          {
            name: '_ens',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
        signature: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'account',
            type: 'address',
          },
        ],
        name: 'AccountCreated',
        type: 'event',
        signature:
          '0x805996f252884581e2f74cf3d2b03564d5ec26ccc90850ae12653dc1b72d1fa2',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'account',
            type: 'address',
          },
        ],
        name: 'AccountEnsNameUpdated',
        type: 'event',
        signature:
          '0x7eaf47b80dadd049c59d75e4fea0cff3ac993d779967e004590899fb0ce321f6',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'rootNode',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'EnsRootNodeAdded',
        type: 'event',
        signature:
          '0x44a96c3928a5c6ba670970f10868d09235a6b7a5770c2ebbf244e2228e546f5c',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'rootNode',
            type: 'bytes32',
          },
        ],
        name: 'EnsRootNodeVerified',
        type: 'event',
        signature:
          '0x3c1e12021a68eb78df268e4fed874721bb38a7b278d9029db9a7b2056592baf2',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'rootNode',
            type: 'bytes32',
          },
        ],
        name: 'EnsRootNodeReleased',
        type: 'event',
        signature:
          '0xc98be4d6a6f25550c39fb4e66d7ecd9ed01b3a569eff063b00e6608270d31f3d',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'node',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'addr',
            type: 'address',
          },
        ],
        name: 'AddrChanged',
        type: 'event',
        signature:
          '0x52d7d861f09ab3d26239d492e8968629f95e9e318cf0b73bfddc441522a15fd2',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_ensLabel',
            type: 'bytes32',
          },
          {
            name: '_ensNode',
            type: 'bytes32',
          },
          {
            name: '_guardianSignature',
            type: 'bytes',
          },
        ],
        name: 'updateAccountEnsName',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x5acb1c1b',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_ensLabel',
            type: 'bytes32',
          },
          {
            name: '_ensNode',
            type: 'bytes32',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'createAccount',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xc6147fc8',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_accountId',
            type: 'uint256',
          },
          {
            name: '_device',
            type: 'address',
          },
          {
            name: '_ensLabel',
            type: 'bytes32',
          },
          {
            name: '_ensNode',
            type: 'bytes32',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
        ],
        name: 'unsafeCreateAccount',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x188b954f',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_accountProxy',
            type: 'address',
          },
        ],
        name: 'changeAccountProxy',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x26d09131',
      },
    ],
    addresses: {
      '1': '0x5913711B94F0e3c0fC933E400DF94321436163FE',
      '3': '0xa8c58f2067d30C65b53fF7745eb490d48167Ca0C',
      '4': null,
      '42': '0x9c30D61E6E1AE5c97e082C5Ee2818A379740110a',
      '65021': '0x0761B2cD55Be5C8Be0c975161b7A855B58943FbB',
    },
    byteCodeHash: null,
  },
  AccountProxyV1: {
    abi: [
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        name: 'accounts',
        outputs: [
          {
            name: 'nonce',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x5e5c06e2',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            name: 'nonce',
            type: 'uint256',
          },
        ],
        name: 'NewAccountOwnerCall',
        type: 'event',
        signature:
          '0xabdd351df118af9f4fddc77805d3855fc9b508fd37b13ed9bda0027c30d7aafb',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_nonce',
            type: 'uint256',
          },
          {
            name: '_data',
            type: 'bytes',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'forwardAccountOwnerCall',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x09403cb6',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_nonce',
            type: 'uint256',
          },
          {
            name: '_data1',
            type: 'bytes',
          },
          {
            name: '_data2',
            type: 'bytes',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'forwardAccountOwnerCalls2',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x5fd785bb',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_nonce',
            type: 'uint256',
          },
          {
            name: '_data1',
            type: 'bytes',
          },
          {
            name: '_data2',
            type: 'bytes',
          },
          {
            name: '_data3',
            type: 'bytes',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'forwardAccountOwnerCalls3',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x671e8e22',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_nonce',
            type: 'uint256',
          },
          {
            name: '_data1',
            type: 'bytes',
          },
          {
            name: '_data2',
            type: 'bytes',
          },
          {
            name: '_data3',
            type: 'bytes',
          },
          {
            name: '_data4',
            type: 'bytes',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'forwardAccountOwnerCalls4',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x48fed175',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_nonce',
            type: 'uint256',
          },
          {
            name: '_data1',
            type: 'bytes',
          },
          {
            name: '_data2',
            type: 'bytes',
          },
          {
            name: '_data3',
            type: 'bytes',
          },
          {
            name: '_data4',
            type: 'bytes',
          },
          {
            name: '_data5',
            type: 'bytes',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'forwardAccountOwnerCalls5',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xec40de34',
      },
    ],
    addresses: {
      '1': '0x85dc6598f0c52c0C808a509bca24CE44168A7Caa',
      '3': '0x87024b7152Fa4120f6Dc1638F023c19b74cDF528',
      '4': '0xB7047Da45ce4D89A565e79A471E6Ab2B7759F053',
      '42': '0x1D59BDEE45A508546C456a6c1DfBBa806b7314c2',
      '65021': '0x12939a4d566e460B7024d38b0A54535c8B282484',
    },
    byteCodeHash: null,
  },
  AccountProxyV2: {
    abi: [
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        name: 'accounts',
        outputs: [
          {
            name: 'nonce',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x5e5c06e2',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            name: 'nonce',
            type: 'uint256',
          },
        ],
        name: 'NewAccountOwnerCall',
        type: 'event',
        signature:
          '0xabdd351df118af9f4fddc77805d3855fc9b508fd37b13ed9bda0027c30d7aafb',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_nonce',
            type: 'uint256',
          },
          {
            name: '_data',
            type: 'bytes',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_erc20GasToken',
            type: 'address',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'forwardAccountOwnerCall',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x4818c86f',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_nonce',
            type: 'uint256',
          },
          {
            name: '_data1',
            type: 'bytes',
          },
          {
            name: '_data2',
            type: 'bytes',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_erc20GasToken',
            type: 'address',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'forwardAccountOwnerCalls2',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xef0de7b9',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_nonce',
            type: 'uint256',
          },
          {
            name: '_data1',
            type: 'bytes',
          },
          {
            name: '_data2',
            type: 'bytes',
          },
          {
            name: '_data3',
            type: 'bytes',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_erc20GasToken',
            type: 'address',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'forwardAccountOwnerCalls3',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xb0d58ad3',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_nonce',
            type: 'uint256',
          },
          {
            name: '_data1',
            type: 'bytes',
          },
          {
            name: '_data2',
            type: 'bytes',
          },
          {
            name: '_data3',
            type: 'bytes',
          },
          {
            name: '_data4',
            type: 'bytes',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_erc20GasToken',
            type: 'address',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'forwardAccountOwnerCalls4',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xc1c76682',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_nonce',
            type: 'uint256',
          },
          {
            name: '_data1',
            type: 'bytes',
          },
          {
            name: '_data2',
            type: 'bytes',
          },
          {
            name: '_data3',
            type: 'bytes',
          },
          {
            name: '_data4',
            type: 'bytes',
          },
          {
            name: '_data5',
            type: 'bytes',
          },
          {
            name: '_refundGas',
            type: 'uint256',
          },
          {
            name: '_erc20GasToken',
            type: 'address',
          },
          {
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'forwardAccountOwnerCalls5',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x4b74237a',
      },
    ],
    addresses: {
      '1': '0x1a0606300CeCA332B356a3fcFe99471B5a7f22BA',
      '3': '0x465E4EbDf1F558A32a8A26a85aEA0bF09Ca33041',
      '4': null,
      '42': '0xe48af0b9777122864a2D923c0C6031812F2c5653',
      '65021': '0xbeD41b68E9ea76c7F58dA6d19c2fC28E47042Eb9',
    },
    byteCodeHash: null,
  },
  AccountFriendRecovery: {
    abi: [
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        name: 'accounts',
        outputs: [
          {
            name: 'nonce',
            type: 'uint256',
          },
          {
            name: 'requiredFriends',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x5e5c06e2',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            name: 'requiredFriends',
            type: 'uint256',
          },
        ],
        name: 'RequiredFriendsChanged',
        type: 'event',
        signature:
          '0x66f92348ae6d17cffb78f8bb20d50b5ac8c983e02794942c183116d3add7d2c0',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            name: 'friends',
            type: 'address[]',
          },
        ],
        name: 'FriendsChanged',
        type: 'event',
        signature:
          '0xca4c23b9ce256db47e380479ed723fa548baf50a55c53aec593bbc3c8be1bcf1',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_requiredFriends',
            type: 'uint256',
          },
          {
            name: '_friends',
            type: 'address[]',
          },
        ],
        name: 'setup',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x0e298303',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_requiredFriends',
            type: 'uint256',
          },
        ],
        name: 'setRequiredFriends',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x4d56bbc9',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_friends',
            type: 'address[]',
          },
        ],
        name: 'setFriends',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xb8755fe2',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_account',
            type: 'address',
          },
          {
            name: '_device',
            type: 'address',
          },
          {
            name: '_friends',
            type: 'address[]',
          },
          {
            name: '_signatures',
            type: 'bytes',
          },
          {
            name: '_gasFee',
            type: 'uint256',
          },
        ],
        name: 'recoverAccount',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x53f3aac6',
      },
    ],
    addresses: {
      '1': '0x4485BC47Dc94DBDd4DD6C213f7111A3FBeDB1886',
      '3': '0x9228fC4b21332DA2dd26Addc6712157D1eE46788',
      '4': '0x94711211C1E34Cb18133334496ff1095B214C312',
      '42': '0x417003c2f714Cb7d97D6c48FE0129187E6d2A116',
      '65021': '0x63636CABbabaDD86D2675110cD469e77Bc87B36A',
    },
    byteCodeHash: null,
  },
  ENSRegistry: {
    abi: [
      {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
        signature: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'node',
            type: 'bytes32',
          },
          {
            indexed: true,
            name: 'label',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'NewOwner',
        type: 'event',
        signature:
          '0xce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e82',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'node',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'Transfer',
        type: 'event',
        signature:
          '0xd4735d920b0f87494915f556dd9b54c8f309026070caea5c737245152564d266',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'node',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'resolver',
            type: 'address',
          },
        ],
        name: 'NewResolver',
        type: 'event',
        signature:
          '0x335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a0',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'node',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'ttl',
            type: 'uint64',
          },
        ],
        name: 'NewTTL',
        type: 'event',
        signature:
          '0x1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa68',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
        signature:
          '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'node',
            type: 'bytes32',
          },
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'resolver',
            type: 'address',
          },
          {
            name: 'ttl',
            type: 'uint64',
          },
        ],
        name: 'setRecord',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xcf408823',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'node',
            type: 'bytes32',
          },
          {
            name: 'label',
            type: 'bytes32',
          },
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'resolver',
            type: 'address',
          },
          {
            name: 'ttl',
            type: 'uint64',
          },
        ],
        name: 'setSubnodeRecord',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x5ef2c7f0',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'node',
            type: 'bytes32',
          },
          {
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'setOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x5b0fc9c3',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'node',
            type: 'bytes32',
          },
          {
            name: 'label',
            type: 'bytes32',
          },
          {
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'setSubnodeOwner',
        outputs: [
          {
            name: '',
            type: 'bytes32',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x06ab5923',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'node',
            type: 'bytes32',
          },
          {
            name: 'resolver',
            type: 'address',
          },
        ],
        name: 'setResolver',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x1896f70a',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'node',
            type: 'bytes32',
          },
          {
            name: 'ttl',
            type: 'uint64',
          },
        ],
        name: 'setTTL',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x14ab9038',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'operator',
            type: 'address',
          },
          {
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xa22cb465',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'node',
            type: 'bytes32',
          },
        ],
        name: 'owner',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x02571be3',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'node',
            type: 'bytes32',
          },
        ],
        name: 'resolver',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x0178b8bf',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'node',
            type: 'bytes32',
          },
        ],
        name: 'ttl',
        outputs: [
          {
            name: '',
            type: 'uint64',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x16a25cbd',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'node',
            type: 'bytes32',
          },
        ],
        name: 'recordExists',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xf79fe538',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xe985e9c5',
      },
    ],
    addresses: {
      '1': '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      '3': '0x4793D6906ba677BCe258e6dbFb0F2ADC1246BE5f',
      '4': '0xb221E91CcE019E40f9013832CbCC2Fe69E862cd0',
      '42': '0x8DCe88634f5B7a53a2E0848e6DA463469e7b0909',
      '65021': '0xC5dFc16D722a4fa6afA59d94439c74537A4Ee70E',
    },
    byteCodeHash: null,
  },
  ENSResolver: {
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'node',
            type: 'bytes32',
          },
          {
            indexed: false,
            name: 'addr',
            type: 'address',
          },
        ],
        name: 'AddrChanged',
        type: 'event',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_node',
            type: 'bytes32',
          },
        ],
        name: 'addr',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_node',
            type: 'bytes32',
          },
          {
            name: '_addr',
            type: 'address',
          },
        ],
        name: 'setAddr',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    addresses: {},
    byteCodeHash: null,
  },
  ExampleToken: {
    abi: null,
    addresses: {
      '1': '0xa54Ac968C55935163Ecb5b331a70C733e6f348b5',
      '3': '0xE99141cBC4E93B91eA82c644860167579368B670',
      '4': '0xb2743F5f6CB3e7A78607dDD5b5A7a41C49B7AAFD',
      '42': '0xFC44bcd70A3F5B0cf07691b15bCD157A929152Cd',
      '65021': '0x2c1581ef3a17a2cE5909a4837F897477B3725A9B',
    },
    byteCodeHash: null,
  },
  ERC20Token: {
    abi: [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x06fdde03',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x095ea7b3',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x18160ddd',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'from',
            type: 'address',
          },
          {
            name: 'to',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x23b872dd',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x313ce567',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'addedValue',
            type: 'uint256',
          },
        ],
        name: 'increaseAllowance',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x39509351',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x70a08231',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x95d89b41',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xa457c2d7',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'to',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xa9059cbb',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xdd62ed3e',
      },
      {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
        signature: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
        signature:
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
        signature:
          '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'mint',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xa0712d68',
      },
    ],
    addresses: {},
    byteCodeHash: null,
  },
  Guardian: {
    abi: null,
    addresses: {
      '1': '0x9C1B13e78FDa54dc392A8d3952d872fef4a80637',
      '3': '0x9C75db6D1895Ee4C0648A324C4dfA941d217081C',
      '4': '0x17b47e911944e292D23Ed38C99d1C476319084d1',
      '42': '0x68a3b5759bAAd0979E0F504D26b1A9f2171fae14',
      '65021': '0xC64B61d239622Ab21283996b659E837cCDfF843F',
    },
    byteCodeHash: null,
  },
  VirtualPaymentManager: {
    abi: [
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'bytes32',
          },
        ],
        name: 'payments',
        outputs: [
          {
            name: 'value',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x0716326d',
      },
      {
        constant: true,
        inputs: [],
        name: 'guardian',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x452a9320',
      },
      {
        constant: true,
        inputs: [],
        name: 'depositWithdrawalLockPeriod',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x525fb194',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address',
          },
          {
            name: '',
            type: 'address',
          },
        ],
        name: 'deposits',
        outputs: [
          {
            name: 'value',
            type: 'uint256',
          },
          {
            name: 'withdrawalUnlockedAt',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x8f601f66',
      },
      {
        inputs: [
          {
            name: '_guardian',
            type: 'address',
          },
          {
            name: '_depositWithdrawalLockPeriod',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
        signature: 'constructor',
      },
      {
        payable: true,
        stateMutability: 'payable',
        type: 'fallback',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'owner',
            type: 'address',
          },
          {
            indexed: false,
            name: 'token',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'NewDeposit',
        type: 'event',
        signature:
          '0x83df459d706116d1b3f1c7b7f77cfea4c635275f5d1e1a53827f536ef48db77d',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'recipient',
            type: 'address',
          },
          {
            indexed: false,
            name: 'token',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'NewWithdrawal',
        type: 'event',
        signature:
          '0x342cefd1b5d176844b82654eddd03fb5a01ec1025b51048cff802621dd873da4',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'owner',
            type: 'address',
          },
          {
            indexed: false,
            name: 'token',
            type: 'address',
          },
          {
            indexed: false,
            name: 'unlockedAt',
            type: 'uint256',
          },
        ],
        name: 'NewWithdrawalRequest',
        type: 'event',
        signature:
          '0xe2feb33d2d0b48e1364da707aece2a0c371646b38401306e481b51468225cc34',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'sender',
            type: 'address',
          },
          {
            indexed: false,
            name: 'recipient',
            type: 'address',
          },
          {
            indexed: false,
            name: 'token',
            type: 'address',
          },
          {
            indexed: false,
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'NewPayment',
        type: 'event',
        signature:
          '0x8b265c5f47dbb02d85eec340b11f85b22d198c26fb58e93864ee4449b42a4bad',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
          {
            name: '_token',
            type: 'address',
          },
        ],
        name: 'getDepositValue',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x55aef0d6',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
          {
            name: '_token',
            type: 'address',
          },
        ],
        name: 'getDepositWithdrawalUnlockedAt',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xa6f75a93',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'depositTo',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
        signature: '0xb760faf9',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_token',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'depositToken',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x338b5dea',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
          {
            name: '_token',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'depositTokenTo',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xeef02468',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_sender',
            type: 'address',
          },
          {
            name: '_recipient',
            type: 'address',
          },
          {
            name: '_token',
            type: 'address',
          },
          {
            name: '_id',
            type: 'uint256',
          },
          {
            name: '_value',
            type: 'uint256',
          },
          {
            name: '_senderSignature',
            type: 'bytes',
          },
          {
            name: '_guardianSignature',
            type: 'bytes',
          },
        ],
        name: 'depositPayment',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0xf398e872',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_sender',
            type: 'address',
          },
          {
            name: '_recipient',
            type: 'address',
          },
          {
            name: '_token',
            type: 'address',
          },
          {
            name: '_id',
            type: 'uint256',
          },
          {
            name: '_value',
            type: 'uint256',
          },
          {
            name: '_senderSignature',
            type: 'bytes',
          },
          {
            name: '_guardianSignature',
            type: 'bytes',
          },
        ],
        name: 'withdrawPayment',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x29d7d95f',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_token',
            type: 'address',
          },
        ],
        name: 'withdrawDeposit',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x51e41700',
      },
    ],
    addresses: {
      '1': '0x26697240DcB649A62B10764A5F41Ba13CB38b5F0',
      '3': '0xdb1b6D2f020068aAe2A1e090F9caF2e932Ef6cBf',
      '4': '0x26cE3eb9eFf5F2a9970810f5eaf2EA45eeeEB52a',
      '42': '0x3a0b52fcb705B4FD6A175cB1580882AB23aba511',
      '65021': '0x5E2355b6522F29D3f0096cA9F4343DB23c243586',
    },
    byteCodeHash: null,
  },
};
