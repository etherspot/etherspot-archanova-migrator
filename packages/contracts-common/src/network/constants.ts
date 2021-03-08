export enum NetworkNames {
  Mainnet = 'mainnet',
  Ropsten = 'ropsten',
  Kovan = 'kovan',
  LocalA = 'localA',
  LocalB = 'localB',
}

export enum NetworkChainIds {
  Mainnet = 1,
  Ropsten = 3,
  Kovan = 42,
  LocalA = 9999,
  LocalB = 6666,
}

export const NETWORK_NAME_TO_CHAIN_ID: {
  [key: string]: number;
} = {
  [NetworkNames.Mainnet]: NetworkChainIds.Mainnet,
  [NetworkNames.Ropsten]: NetworkChainIds.Ropsten,
  [NetworkNames.Kovan]: NetworkChainIds.Kovan,
  [NetworkNames.LocalA]: NetworkChainIds.LocalA,
  [NetworkNames.LocalB]: NetworkChainIds.LocalB,
};

export const NETWORK_CHAIN_ID_TO_NAME: {
  [key: number]: NetworkNames;
} = {
  [NetworkChainIds.Mainnet]: NetworkNames.Mainnet,
  [NetworkChainIds.Ropsten]: NetworkNames.Ropsten,
  [NetworkChainIds.Kovan]: NetworkNames.Kovan,
  [NetworkChainIds.LocalA]: NetworkNames.LocalA,
  [NetworkChainIds.LocalB]: NetworkNames.LocalB,
};
