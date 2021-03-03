pragma solidity ^0.5.10;

import "./AbstractAccount.sol";


/**
 * @title Account
 */
contract Account is AbstractAccount {

  modifier onlyOwner() {
    require(
      devices[msg.sender].isOwner
    );

    _;
  }

  constructor() public {
    devices[msg.sender].isOwner = true;
    devices[msg.sender].exists = true;
    devices[msg.sender].existed = true;
  }

  function() external payable {
    //
  }

  function addDevice(address _device, bool _isOwner) onlyOwner public {
    require(
      _device != address(0)
    );
    require(
      !devices[_device].exists
    );

    devices[_device].isOwner = _isOwner;
    devices[_device].exists = true;
    devices[_device].existed = true;

    emit DeviceAdded(_device, _isOwner);
  }

  function removeDevice(address _device) onlyOwner public {
    require(
      devices[_device].exists
    );

    devices[_device].isOwner = false;
    devices[_device].exists = false;

    emit DeviceRemoved(_device);
  }

  function executeTransaction(address payable _recipient, uint256 _value, bytes memory _data) onlyOwner public returns (bytes memory _response) {
    require(
      _recipient != address(0)
    );

    bool _succeeded;
    (_succeeded, _response) = _recipient.call.value(_value)(_data);

    require(
      _succeeded
    );

    emit TransactionExecuted(_recipient, _value, _data, _response);
  }

  function isValidSignature(
    bytes memory _data,
    bytes memory _signature
  ) public view returns (bytes4 magicValue) {
    address _recovered;

    if (_signature.length == 65) {
      bytes32 _r;
      bytes32 _s;
      uint8 _v;

      assembly {
        _r := mload(add(_signature, 0x20))
        _s := mload(add(_signature, 0x40))
        _v := byte(0, mload(add(_signature, 0x60)))
      }

      if (_v < 27) {
        _v += 27;
      }

      if (_v == 27 || _v == 28) {
        _recovered = ecrecover(
          keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", uint2str(_data.length), _data)),
          _v,
          _r,
          _s
        );
      }
    }

    if (devices[_recovered].existed) {
      magicValue = 0x20c13b0b;
    } else {
      magicValue = 0xffffffff;
    }
  }

  function uint2str(uint _num) internal pure returns (string memory _uintAsString) {
    if (_num == 0) {
      return "0";
    }
    uint i = _num;
    uint j = _num;
    uint len;
    while (j != 0) {
      len++;
      j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint k = len - 1;
    while (i != 0) {
      bstr[k--] = byte(uint8(48 + i % 10));
      i /= 10;
    }
    return string(bstr);
  }
}
