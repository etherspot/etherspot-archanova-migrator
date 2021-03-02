import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async hre => {
  const {
    deployments: { deploy },
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
    args: [
      guardian.address,
      5, // virtualPaymentLockPeriod,
    ],
  });

  await deploy('ExampleToken', {
    from,
    log: true,
  });
};

module.exports = func;
