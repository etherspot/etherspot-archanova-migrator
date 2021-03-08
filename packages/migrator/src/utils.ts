import { utils } from 'ethers';
import { MigrationToken } from './interfaces';

export function isAddress(value: string): boolean {
  let result = false;

  if (value) {
    try {
      const address = utils.getAddress(value);
      result = address === value || address.toLowerCase() === value;
    } catch (err) {
      result = false;
    }
  }

  return result;
}

export function prepareTokensArgs(tokens: MigrationToken[]): any[] {
  const result: any[][] = [[], []];

  for (const { token, amount } of tokens) {
    result[0].push(token);
    result[1].push(amount);
  }

  return result;
}
