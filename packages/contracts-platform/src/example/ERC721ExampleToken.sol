pragma solidity ^0.5.10;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";


/**
 * @title ERC721 example token
 */
contract ERC721ExampleToken is ERC721 {
  constructor() public {
    //
  }

  function mint(uint256 tokenId) public returns (bool) {
    _mint(msg.sender, tokenId);
    return true;
  }

  function mintTo(address to, uint256 tokenId) public returns (bool) {
    _mint(to, tokenId);
    return true;
  }
}
