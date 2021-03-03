// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@etherspot/contracts/src/common/libs/SignatureLib.sol";
import "./ArchanovaAccount.sol";


/**
 * @title Archanova migrator
 *
 * @author Stanisław Głogowski <stan@pillarproject.io>
 */
contract ArchanovaMigrator {
  bytes32 constant private MIGRATION_PREFIX = keccak256(abi.encodePacked("etherspot <> archanova migration"));

  using SignatureLib for bytes32;

  uint256 private chainId;

  // modifiers

  modifier verifyArchanovaAccountOwner(
    address payable archanovaAccount,
    address payable etherspotAccount,
    bytes memory archanovaAccountDeviceSignature
  )
  {
    address recovered = keccak256(abi.encodePacked(
      "\x19Ethereum Signed Message:\n32",
      keccak256(abi.encodePacked(
        chainId,
        address(this),
        MIGRATION_PREFIX,
        archanovaAccount,
        etherspotAccount
      ))
    )).recoverAddress(archanovaAccountDeviceSignature);

    (bool exists, bool isOwner, ) = ArchanovaAccount(archanovaAccount).devices(
      recovered
    );

    require(
      exists && isOwner
    );

    _;
  }

  /**
   * @dev internal constructor
   */
  constructor() public {
    uint chainId_;

    // solhint-disable-next-line no-inline-assembly
    assembly {
      chainId_ := chainid()
    }

    chainId = chainId_;
  }

  // external functions

  function migrateBalance(
    address payable archanovaAccount,
    address payable etherspotAccount,
    uint256 balance,
    bytes calldata archanovaAccountDeviceSignature
  )
    verifyArchanovaAccountOwner(
      archanovaAccount,
      etherspotAccount,
      archanovaAccountDeviceSignature
    )
    external
  {
    _migrateBalance(
      archanovaAccount,
      etherspotAccount,
      balance
    );
  }

  // private functions

  function _migrateBalance(
    address payable archanovaAccount,
    address payable etherspotAccount,
    uint256 balance
  )
    private
  {
    ArchanovaAccount(archanovaAccount).executeTransaction(
      etherspotAccount,
      balance,
      new bytes(0)
    );
  }
}
