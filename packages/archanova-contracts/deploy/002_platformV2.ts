import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import { DeployFunction } from 'hardhat-deploy/types';
import { getContractAddress, ContractNames } from '@etherspot/contracts';

const func: DeployFunction = async hre => {
  const {
    deployments: { get, deploy },
    network: {
      config: { chainId },
    },
    getNamedAccounts,
  } = hre;
  const { from } = await getNamedAccounts();

  const guardian = await get('Account');

  const accountProxyV2 = await deploy('AccountProxyV2', {
    from,
    log: true,
  });

  await deploy('AccountProviderV2', {
    from,
    log: true,
    args: [
      guardian.address,
      guardian.bytecode,
      accountProxyV2.address,
      getContractAddress(ContractNames.ENSRegistry, chainId),
    ],
  });
};

module.exports = func;
