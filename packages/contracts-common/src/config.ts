import { extendConfig } from 'hardhat/config';
import { join } from 'path';

const { ETHERSCAN_API_KEY } = process.env;

extendConfig(config => {
  if (!config.buildPaths) {
    config.buildPaths = {};
  }

  if (!config.knownContracts) {
    config.knownContracts = {};
  }

  const { paths, buildPaths } = config;
  const { root } = paths;

  paths.artifacts = join(root, '.hardhat/artifacts');
  paths.cache = join(root, '.hardhat/cache');
  paths.deploy = [join(root, 'deploy')];
  paths.deployments = join(root, 'deployments');
  paths.sources = join(root, 'src');

  buildPaths.artifacts = join(root, 'artifacts');
  buildPaths.dist = join(root, 'dist');

  config.etherscan = {
    apiKey: ETHERSCAN_API_KEY,
  };
});
