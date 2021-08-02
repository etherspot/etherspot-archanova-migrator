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

export function prepareERC20TokensArgs(items: MigrationToken[]): any[] {
  const result: any[][] = [[], []];

  for (const item of items) {
    const { token, amount } = item as MigrationERC20Token;

    result[0].push(token);
    result[1].push(amount);
  }

  return result;
}

export function prepareERC721TokensArgs(items: MigrationToken[]): any[] {
  const result: any[][] = [[], [], []];

  for (const item of items) {
    const { token } = item as MigrationERC20Token;
    const { id, useLegacyTransferMethod } = item as MigrationERC721Token;

    result[0].push(token);
    result[1].push(id);
    result[2].push(useLegacyTransferMethod);
  }

  return result;
}
