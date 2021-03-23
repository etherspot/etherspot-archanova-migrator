import { DeployFunction } from '@etherspot/archanova-contracts-common';

const func: DeployFunction = async hre => {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { from } = await getNamedAccounts();

  await deploy('ERC20ExampleToken', {
    from,
    log: true,
  });

  await deploy('ERC721ExampleToken', {
    from,
    log: true,
  });
};

module.exports = func;
