import { DeployFunction } from '@etherspot/archanova-contracts-common';

const func: DeployFunction = async hre => {
  const {
    deployments: { deploy, get, read, execute },
    getNamedAccounts,
  } = hre;
  const { from } = await getNamedAccounts();

  await deploy('ArchanovaMigrator', {
    from,
    log: true,
  });

  if (!(await read('ArchanovaMigrator', 'isInitialized'))) {
    const ensController = await get('ENSController');
    const ensRegistry = await get('ENSRegistry');

    await execute(
      'ArchanovaMigrator',
      {
        from,
        log: true,
      },
      'initialize',
      ensController.address,
      ensRegistry.address,
    );
  }
};

module.exports = func;
