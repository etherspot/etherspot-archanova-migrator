const contracts = require('./contracts');

function getContractAbi(contractName) {
  return contracts[contractName] ? contracts[contractName].abi || null : null;
}

function getContractAddress(contractName, networkId = 1) {
  return contracts[contractName]
    ? contracts[contractName].addresses[`${networkId}`] || null
    : null;
}

function getContractByteCodeHash(contractName, networkId = 1) {
  return contracts[contractName]
    ? contracts[contractName].byteCodeHashes[`${networkId}`] || null
    : null;
}

function getContractTypedDataDomainName(contractName) {
  return contracts[contractName]
    ? contracts[contractName].typedDataDomainName || null
    : null;
}

function getContractTypedDataDomainVersion(contractName) {
  return contracts[contractName]
    ? contracts[contractName].typedDataDomainVersion || null
    : null;
}

module.exports = {
  getContractAbi,
  getContractAddress,
  getContractByteCodeHash,
  getContractTypedDataDomainName,
  getContractTypedDataDomainVersion,
};
