import { DeployFunction } from '@etherspot/archanova-contracts-common';
import { utils, constants } from 'ethers';

const func: DeployFunction = async hre => {
  const {
    deployments: { get, deploy, read, execute },
    getNamedAccounts,
  } = hre;
  const { from } = await getNamedAccounts();

  const guardian = await get('Account');

  const ensRegistry = await get('ENSRegistry');

  const accountProxyV2 = await deploy('AccountProxyV2', {
    from,
    log: true,
  });

  const accountProviderV2 = await deploy('AccountProviderV2', {
    from,
    log: true,
    args: [
      guardian.address,
      guardian.bytecode,
      accountProxyV2.address,
      ensRegistry.address,
    ],
  });

  const name = `archanova2${Math.round(Date.now() / 1000)}`;
  const nameHash = utils.namehash(name);

  if (
    (await read('ENSRegistry', 'owner', nameHash)) === constants.AddressZero
  ) {
    await execute(
      'ENSRegistry',
      {
        from,
        log: true,
      },
      'setSubnodeOwner',
      constants.HashZero,
      utils.id(name),
      from,
    );
  }

  if ((await read('ENSRegistry', 'owner', nameHash)) === from) {
    const { owner }: { owner: string } = await read(
      'AccountProviderV2',
      'ensRootNodes',
      nameHash,
    );

    if (owner === constants.AddressZero) {
      await execute(
        'AccountProviderV2',
        { from, log: true },
        'addEnsRootNode',
        nameHash,
      );
    }

    await execute(
      'ENSRegistry',
      {
        from,
        log: true,
      },
      'setOwner',
      nameHash,
      accountProviderV2.address,
    );
  }

  if (
    (await read('ENSRegistry', 'owner', nameHash)) === accountProviderV2.address
  ) {
    const { verified }: { verified: boolean } = await read(
      'AccountProviderV2',
      'ensRootNodes',
      nameHash,
    );

    if (!verified) {
      await execute(
        'AccountProviderV2',
        { from, log: true },
        'verifyEnsRootNode',
        nameHash,
      );
    }
  }
};

func.skip = async () => true;

module.exports = func;
