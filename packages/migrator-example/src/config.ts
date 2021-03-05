export interface Config {
  providerUrl: string;
  providerPrivateKey: string;
  migrateBalance: boolean;
  migrateERC20Token1: boolean;
  migrateERC20Token2: boolean;
  migrateENSName: boolean;
}

const {
  LOCAL_A_PROVIDER_ENDPOINT, //
  LOCAL_A_PROVIDER_PRIVATE_KEY,
  OMIT_MIGRATE_BALANCE,
  OMIT_MIGRATE_ERC20_TOKEN_1,
  OMIT_MIGRATE_ERC20_TOKEN_2,
  OMIT_MIGRATE_ENS_NAME,
} = process.env;

function parseOmitEnv(env: string): boolean {
  return !parseInt(env, 10);
}

export const config: Config = {
  providerUrl: LOCAL_A_PROVIDER_ENDPOINT,
  providerPrivateKey: LOCAL_A_PROVIDER_PRIVATE_KEY,
  migrateBalance: parseOmitEnv(OMIT_MIGRATE_BALANCE),
  migrateERC20Token1: parseOmitEnv(OMIT_MIGRATE_ERC20_TOKEN_1),
  migrateERC20Token2: parseOmitEnv(OMIT_MIGRATE_ERC20_TOKEN_2),
  migrateENSName: parseOmitEnv(OMIT_MIGRATE_ENS_NAME),
};
