const contractsJs = (data: any) => `/* eslint-disable */

module.exports = ${JSON.stringify(data, null, 2)};
`;

const constantsJs = (data: string[]) => `/* eslint-disable */

module.exports = {
  ContractNames: {${data.map(name => `\n    ${name}: '${name}',`).join('')}
  },
};
`;

const constantsDts = (
  data: string[],
) => `export declare enum ContractNames {${data
  .map(name => `\n  ${name} = '${name}',`)
  .join('')}
}
`;

export default {
  contractsJs,
  constantsJs,
  constantsDts,
};
