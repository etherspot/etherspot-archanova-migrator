// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@etherspot/contracts/src/common/libs/SignatureLib.sol";
import "@etherspot/contracts/src/common/lifecycle/Initializable.sol";
import "@etherspot/contracts/src/common/token/ERC20Token.sol";
import "@etherspot/contracts/src/ens/ENSController.sol";
import "@etherspot/contracts/src/ens/ENSRegistry.sol";
import "./ArchanovaAccount.sol";


/**
 * @title Archanova migrator
 *
 * @author Stanisław Głogowski <stan@pillarproject.io>
 */
contract ArchanovaMigrator is Initializable {
  using SignatureLib for bytes32;

  bytes32 constant private MIGRATION_MESSAGE_PREFIX = keccak256(abi.encodePacked("etherspot <> archanova migration"));

  ENSController public ensController;
  ENSRegistry public ensRegistry;

  uint256 private chainId;

  // events

  event BalanceTransferred(
    address archanovaAccount,
    address etherspotAccount,
    uint256 value
  );

  event ERC20TokenTransferred(
    address archanovaAccount,
    address etherspotAccount,
    address token,
    uint256 tokenAmount
  );

  event ENSNodeTransferred(
    address archanovaAccount,
    address etherspotAccount,
    bytes32 ensNode
  );


  /**
   * @dev public constructor
   */
  constructor()
    public
    Initializable()
  {
    uint chainId_;

    // solhint-disable-next-line no-inline-assembly
    assembly {
      chainId_ := chainid()
    }

    chainId = chainId_;
  }

  // external functions

  /**
   * @notice Initializes `ArchanovaMigrator` contract
   * @param ensController_ ens controller address
   * @param ensRegistry_ ens registry address
   */
  function initialize(
    ENSController ensController_,
    ENSRegistry ensRegistry_
  )
    external
    onlyInitializer
  {
    ensController = ensController_;
    ensRegistry = ensRegistry_;
  }

  function transferBalance(
    address payable archanovaAccount,
    address payable etherspotAccount,
    uint256 value,
    bytes calldata archanovaAccountDeviceSignature
  )
    external
  {
    _verifyArchanovaAccountOwner(
      archanovaAccount,
      etherspotAccount,
      archanovaAccountDeviceSignature
    );

    _transferBalance(
      archanovaAccount,
      etherspotAccount,
      value
    );
  }

  function transferERC20Tokens(
    address payable archanovaAccount,
    address payable etherspotAccount,
    address[] calldata tokens,
    uint256[] calldata tokensAmounts,
    bytes calldata archanovaAccountDeviceSignature
  )
    external
  {
    _verifyArchanovaAccountOwner(
      archanovaAccount,
      etherspotAccount,
      archanovaAccountDeviceSignature
    );

    _transferERC20Tokens(
      archanovaAccount,
      etherspotAccount,
      tokens,
      tokensAmounts
    );
  }

  function transferBalanceAndERC20Tokens(
    address payable archanovaAccount,
    address payable etherspotAccount,
    uint256 value,
    address[] calldata tokens,
    uint256[] calldata tokensAmounts,
    bytes calldata archanovaAccountDeviceSignature
  )
    external
  {
    _verifyArchanovaAccountOwner(
      archanovaAccount,
      etherspotAccount,
      archanovaAccountDeviceSignature
    );

    _transferBalance(
      archanovaAccount,
      etherspotAccount,
      value
    );

    _transferERC20Tokens(
      archanovaAccount,
      etherspotAccount,
      tokens,
      tokensAmounts
    );
  }

  function transferENSNode(
    address payable archanovaAccount,
    address payable etherspotAccount,
    bytes32 ensNode,
    bytes calldata archanovaAccountDeviceSignature
  )
    external
  {
    _verifyArchanovaAccountOwner(
      archanovaAccount,
      etherspotAccount,
      archanovaAccountDeviceSignature
    );

    _transferENSNode(
      archanovaAccount,
      etherspotAccount,
      ensNode
    );
  }

  function transferBalanceAndENSNode(
    address payable archanovaAccount,
    address payable etherspotAccount,
    uint256 value,
    bytes32 ensNode,
    bytes calldata archanovaAccountDeviceSignature
  )
    external
  {
    _verifyArchanovaAccountOwner(
      archanovaAccount,
      etherspotAccount,
      archanovaAccountDeviceSignature
    );

    _transferBalance(
      archanovaAccount,
      etherspotAccount,
      value
    );

    _transferENSNode(
      archanovaAccount,
      etherspotAccount,
      ensNode
    );
  }

  function transferERC20TokensAndENSNode(
    address payable archanovaAccount,
    address payable etherspotAccount,
    address[] calldata tokens,
    uint256[] calldata tokensAmounts,
    bytes32 ensNode,
    bytes calldata archanovaAccountDeviceSignature
  )
    external
  {
    _verifyArchanovaAccountOwner(
      archanovaAccount,
      etherspotAccount,
      archanovaAccountDeviceSignature
    );

    _transferERC20Tokens(
      archanovaAccount,
      etherspotAccount,
      tokens,
      tokensAmounts
    );

    _transferENSNode(
      archanovaAccount,
      etherspotAccount,
      ensNode
    );
  }

  function transferBalanceAndERC20TokensAndENSNode(
    address payable archanovaAccount,
    address payable etherspotAccount,
    uint256 value,
    address[] calldata tokens,
    uint256[] calldata tokensAmounts,
    bytes32 ensNode,
    bytes calldata archanovaAccountDeviceSignature
  )
    external
  {
    _verifyArchanovaAccountOwner(
      archanovaAccount,
      etherspotAccount,
      archanovaAccountDeviceSignature
    );

    _transferBalance(
      archanovaAccount,
      etherspotAccount,
      value
    );

    _transferERC20Tokens(
      archanovaAccount,
      etherspotAccount,
      tokens,
      tokensAmounts
    );

    _transferENSNode(
      archanovaAccount,
      etherspotAccount,
      ensNode
    );
  }

  // private functions

  function _transferBalance(
    address payable archanovaAccount,
    address payable etherspotAccount,
    uint256 value
  )
    private
  {
    ArchanovaAccount(archanovaAccount).executeTransaction(
      etherspotAccount,
      value,
      new bytes(0)
    );

    emit BalanceTransferred(
      archanovaAccount,
      etherspotAccount,
      value
    );
  }

  function _transferERC20Tokens(
    address payable archanovaAccount,
    address payable etherspotAccount,
    address[] memory tokens,
    uint256[] memory tokensAmounts
  )
    private
  {
    uint tokensLen = tokens.length;

    for (uint i = 0; i < tokensLen; i++) {
      bytes memory response = ArchanovaAccount(archanovaAccount).executeTransaction(
        payable(tokens[i]),
        0,
        abi.encodeWithSelector(
          ERC20Token(tokens[i]).transfer.selector,
          etherspotAccount,
          tokensAmounts[i]
        )
      );

      if (response.length > 0) {
        require(
          abi.decode(response, (bool)),
          "ArchanovaMigrator: ERC20Token transfer reverted"
        );
      }

      emit ERC20TokenTransferred(
        archanovaAccount,
        etherspotAccount,
        tokens[i],
        tokensAmounts[i]
      );
    }
  }

  function _transferENSNode(
    address payable archanovaAccount,
    address payable etherspotAccount,
    bytes32 ensNode
  )
    private
  {
    ArchanovaAccount(archanovaAccount).executeTransaction(
      payable(address(ensRegistry)),
      0,
      abi.encodeWithSelector(
        ensRegistry.setResolver.selector,
        ensNode,
        address(ensController)
      )
    );

    ArchanovaAccount(archanovaAccount).executeTransaction(
      payable(address(ensController)),
      0,
      abi.encodeWithSelector(
        ensController.syncAddr.selector,
        ensNode
      )
    );

    ArchanovaAccount(archanovaAccount).executeTransaction(
      payable(address(ensController)),
      0,
      abi.encodeWithSelector(
        ensController.setAddr.selector,
        ensNode,
        etherspotAccount
      )
    );

    ArchanovaAccount(archanovaAccount).executeTransaction(
      payable(address(ensRegistry)),
      0,
      abi.encodeWithSelector(
        ensRegistry.setOwner.selector,
        ensNode,
        etherspotAccount
      )
    );

    emit ENSNodeTransferred(
      archanovaAccount,
      etherspotAccount,
      ensNode
    );
  }

  // private functions (views)

  function _verifyArchanovaAccountOwner(
    address payable archanovaAccount,
    address payable etherspotAccount,
    bytes memory archanovaAccountDeviceSignature
  )
    private
    view
  {
    address recovered = keccak256(abi.encodePacked(
        "\x19Ethereum Signed Message:\n32",
        keccak256(abi.encodePacked(
          chainId,
          address(this),
          MIGRATION_MESSAGE_PREFIX,
          archanovaAccount,
          etherspotAccount
        ))
      )).recoverAddress(archanovaAccountDeviceSignature);

    (bool exists, bool isOwner, ) = ArchanovaAccount(archanovaAccount).devices(
      recovered
    );

    require(
      exists && isOwner,
      "ArchanovaMigrator: invalid archanovaAccountDeviceSignature"
    );
  }
}
