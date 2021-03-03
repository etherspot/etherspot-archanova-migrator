const contractsJs = (data: any) => `/* eslint-disable */

module.exports = ${JSON.stringify(data, null, 2)};
`;

const constantsJs = (data: string[]) => `/* eslint-disable */

module.exports = {
  ContractNames: {${data.map(name => `\n    ${name}: '${name}',`).join('')}
  },
};
`;

const constantsTs = (
  data: string[],
) => `export declare enum ContractNames {${data
  .map(name => `\n  ${name} = '${name}',`)
  .join('')}
}
`;

const helpersTs = () => `import { ContractNames } from './constants';

export declare function getContractAbi(contractName: ContractNames): any | null;

export declare function getContractAddress(
  contractName: ContractNames,
  networkId?: string | number,
): string | null;

export declare function getContractByteCodeHash(
  contractName: ContractNames,
  networkId?: string | number,
): string | null;
`;

const helpersJs = () => `const contracts = require('./contracts');

function getContractAbi(contractName) {
  return contracts[contractName] ? contracts[contractName].abi || null : null;
}

function getContractAddress(contractName, networkId = 1) {
  return contracts[contractName]
    ? contracts[contractName].addresses[\`\${networkId}\`] || null
    : null;
}

function getContractByteCodeHash(contractName, networkId = 1) {
  return contracts[contractName]
    ? contracts[contractName].byteCodeHashes[\`\${networkId}\`] || null
    : null;
}

module.exports = {
  getContractAbi,
  getContractAddress,
  getContractByteCodeHash,
};
`;

const indexTs = () => `export * from './constants';
export * from './helpers';
`;

const indexJs = () => `const constants = require('./constants');
const helpers = require('./helpers');

module.exports = {
  ...constants,
  ...helpers,
};
`;

export default {
  contractsJs,
  constantsJs,
  constantsTs,
  helpersTs,
  helpersJs,
  indexTs,
  indexJs,
};
