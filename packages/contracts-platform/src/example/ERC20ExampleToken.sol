pragma solidity ^0.5.10;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


/**
 * @title ERC20 example token
 */
contract ERC20ExampleToken is ERC20 {
  constructor() public {
    //
  }

  function mint(uint256 amount) public returns (bool) {
    _mint(msg.sender, amount);
    return true;
  }

  function mintTo(address to, uint256 amount) public returns (bool) {
    _mint(to, amount);
    return true;
  }
}
