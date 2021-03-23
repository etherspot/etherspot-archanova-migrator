import {
  DeployFunction,
  NetworkNames,
} from '@etherspot/archanova-contracts-common';

const func: DeployFunction = async hre => {
  const {
    deployments: { deploy, get, read, execute },
    network,
    getNamedAccounts,
  } = hre;
  const { from } = await getNamedAccounts();

  await deploy('ArchanovaMigrator', {
    from,
    log: true,
  });

  if (!(await read('ArchanovaMigrator', 'isInitialized'))) {
    const ensController = await get('ENSController');
    let ensRegistryAddress: string;

    if (network.name === NetworkNames.Mainnet) {
      // see: https://docs.ens.domains/ens-deployments
      ensRegistryAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
    } else {
      ({ address: ensRegistryAddress } = await get('ENSRegistry'));
    }

    await execute(
      'ArchanovaMigrator',
      {
        from,
        log: true,
      },
      'initialize',
      ensController.address,
      ensRegistryAddress,
    );
  }
};

module.exports = func;
