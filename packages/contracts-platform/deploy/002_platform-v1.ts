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

  const accountProxyV1 = await deploy('AccountProxyV1', {
    from,
    log: true,
  });

  const accountProviderV1 = await deploy('AccountProviderV1', {
    from,
    log: true,
    args: [
      guardian.address,
      guardian.bytecode,
      accountProxyV1.address,
      ensRegistry.address,
    ],
  });

  const accountId = Math.round(Date.now() / 1000);
  const tld = 'archanova';
  const tldLabel = utils.id(tld);
  const tldHash = utils.namehash(tld);

  const label = `archanova1${accountId}`;
  const labelHash = utils.id(label);

  const name = `${label}.${tld}`;
  const nameHash = utils.namehash(name);

  if ((await read('ENSRegistry', 'owner', tldHash)) === constants.AddressZero) {
    await execute(
      'ENSRegistry',
      {
        from,
        log: true,
      },
      'setSubnodeOwner',
      constants.HashZero,
      tldLabel,
      from,
    );
  }

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
      tldHash,
      labelHash,
      from,
    );
  }

  if ((await read('ENSRegistry', 'owner', nameHash)) === from) {
    const { owner }: { owner: string } = await read(
      'AccountProviderV1',
      'ensRootNodes',
      nameHash,
    );

    if (owner === constants.AddressZero) {
      await execute(
        'AccountProviderV1',
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
      accountProviderV1.address,
    );
  }

  if (
    (await read('ENSRegistry', 'owner', nameHash)) === accountProviderV1.address
  ) {
    const { verified }: { verified: boolean } = await read(
      'AccountProviderV1',
      'ensRootNodes',
      nameHash,
    );

    if (!verified) {
      await execute(
        'AccountProviderV1',
        { from, log: true },
        'verifyEnsRootNode',
        nameHash,
      );
    }
  }

  {
    const label = `account${accountId}`;
    const labelHash = utils.id(label);

    try {
      const { events } = await execute(
        'AccountProviderV1',
        {
          from, //
          log: true,
          estimatedGasLimit: 3000000,
        },
        'unsafeCreateAccount',
        accountId,
        from,
        labelHash,
        nameHash,
        0,
      );

      console.log(
        events.map(({ event, args }) => ({
          event,
          args,
        })),
      );

      console.log(
        await read('ENSRegistry', 'owner', utils.namehash(`${label}.${name}`)),
      );
    } catch (err) {
      console.log(err.data);
    }
  }
};

// func.skip = async () => true;

module.exports = func;
