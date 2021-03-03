pragma solidity ^0.5.10;

import "./ERC1271.sol";


/**
 * @title Abstract Account
 */
contract AbstractAccount is ERC1271 {

  event DeviceAdded(address device, bool isOwner);
  event DeviceRemoved(address device);
  event TransactionExecuted(address recipient, uint256 value, bytes data, bytes response);

  struct Device {
    bool isOwner;
    bool exists;
    bool existed;
  }

  mapping(address => Device) public devices;

  function addDevice(address _device, bool _isOwner) public;

  function removeDevice(address _device) public;

  function executeTransaction(address payable _recipient, uint256 _value, bytes memory _data) public returns (bytes memory _response);
}
