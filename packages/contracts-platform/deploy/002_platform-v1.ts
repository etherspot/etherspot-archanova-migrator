import { DeployFunction } from '@etherspot/archanova-contracts-common';
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

  const accountProxyV1 = await deploy('AccountProxyV1', {
    from,
    log: true,
  });

  await deploy('AccountProviderV1', {
    from,
    log: true,
    args: [
      guardian.address,
      guardian.bytecode,
      accountProxyV1.address,
      getContractAddress(ContractNames.ENSRegistry, chainId),
    ],
  });
};

module.exports = func;
