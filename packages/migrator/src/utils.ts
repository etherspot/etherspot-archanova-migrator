import { utils } from 'ethers';
import {
  MigrationERC20Token,
  MigrationERC721Token,
  MigrationToken,
} from './interfaces';

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

export function prepareTokensArgs(items: MigrationToken[]): any[] {
  const result: any[][] = [[], []];

  for (const item of items) {
    const { token, amount } = item as MigrationERC20Token;
    const { id } = item as MigrationERC721Token;

    result[0].push(token);
    result[1].push(amount || id);
  }

  return result;
}
