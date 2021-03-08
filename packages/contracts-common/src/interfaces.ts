export type KnownContractsConfig = {
  [key: string]: {
    [key: string]: {
      address?: string;
      byteCodeHash?: string;
    };
  };
};
