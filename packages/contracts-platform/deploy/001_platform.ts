import { DeployFunction } from '@etherspot/archanova-contracts-common';
import { utils, constants } from 'ethers';

const func: DeployFunction = async hre => {
  const {
    deployments: { get, deploy, read, execute },
    getNamedAccounts,
  } = hre;
  const { from } = await getNamedAccounts();

  const guardian = await deploy('Account', {
    from,
    log: true,
  });

  await deploy('AccountFriendRecovery', {
    from,
    log: true,
  });

  await deploy('VirtualPaymentManager', {
    from,
    log: true,
    args: [guardian.address, 5],
  });

  await deploy('ExampleToken', {
    from,
    log: true,
  });

  const ensRegistry = await get('ENSRegistry');

  for (const version of [1, 2]) {
    const accountProxy = await deploy(`AccountProxyV${version}`, {
      from,
      log: true,
    });

    const accountProvider = await deploy(`AccountProviderV${version}`, {
      from,
      log: true,
      args: [
        guardian.address,
        guardian.bytecode,
        accountProxy.address,
        ensRegistry.address,
      ],
    });

    const tld = `archanova-v${version}`;
    const tldLabel = utils.id(tld);
    const tldHash = utils.namehash(tld);

    if (
      (await read('ENSRegistry', 'owner', tldHash)) === constants.AddressZero
    ) {
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

    if ((await read('ENSRegistry', 'owner', tldHash)) === from) {
      const { owner }: { owner: string } = await read(
        `AccountProviderV${version}`,
        'ensRootNodes',
        tldHash,
      );

      if (owner === constants.AddressZero) {
        await execute(
          `AccountProviderV${version}`,
          { from, log: true },
          'addEnsRootNode',
          tldHash,
        );
      }

      await execute(
        'ENSRegistry',
        {
          from,
          log: true,
        },
        'setOwner',
        tldHash,
        accountProvider.address,
      );
    }

    if (
      (await read('ENSRegistry', 'owner', tldHash)) === accountProvider.address
    ) {
      const { verified }: { verified: boolean } = await read(
        `AccountProviderV${version}`,
        'ensRootNodes',
        tldHash,
      );

      if (!verified) {
        await execute(
          `AccountProviderV${version}`,
          { from, log: true },
          'verifyEnsRootNode',
          tldHash,
        );
      }
    }
  }
};

module.exports = func;
