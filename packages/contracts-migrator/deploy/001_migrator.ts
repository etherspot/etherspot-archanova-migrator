import { DeployFunction } from '@etherspot/archanova-contracts-common';
import { ContractNames, getContractAddress } from '@etherspot/contracts';

const func: DeployFunction = async hre => {
  const {
    deployments: { deploy, execute },
    network: {
      config: { chainId },
    },
    getNamedAccounts,
  } = hre;
  const { from } = await getNamedAccounts();

  await deploy('ArchanovaMigrator', {
    from,
    log: true,
  });

  await execute(
    'ArchanovaMigrator',
    {
      from,
      log: true,
    },
    'initialize',
    getContractAddress(ContractNames.ENSController, chainId),
    getContractAddress(ContractNames.ENSRegistry, chainId),
  );
};

module.exports = func;
