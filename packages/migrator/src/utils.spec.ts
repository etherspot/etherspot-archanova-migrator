import { isAddress, prepareERC20TokensArgs, prepareERC721TokensArgs } from './utils';
import { MigrationERC20Token, MigrationERC721Token } from './interfaces';

describe('utils', () => {
  test('isAddress()', () => {
    expect(
      isAddress('0xeeFc7bfBC3F3d384Ab6Ee53b7fA7ab182cc23DCA'),
    ).toBeTruthy();
    expect(
      isAddress('0xeefc7bfbc3f3d384ab6ee53b7fa7ab182cc23dca'),
    ).toBeTruthy();
    expect(isAddress('0XEEFC7BFBC3F3D384AB6EE53B7FA7AB182CC23DCA')).toBeFalsy();
    expect(isAddress('0xeefc7bfbc3f3d384ab6ee53b7fa')).toBeFalsy();
    expect(isAddress('test')).toBeFalsy();
  });

  test('prepareERC20TokensArgs()', () => {
    const token: MigrationERC20Token[] = [
      {
        token: 'A',
        amount: 1,
      },
      {
        token: 'B',
        amount: 2,
      },
    ];

    expect(prepareERC20TokensArgs([])).toStrictEqual([[], []]);
    expect(prepareERC20TokensArgs(token.slice(0, 1))).toStrictEqual([
      [token[0].token],
      [token[0].amount],
    ]);
    expect(prepareERC20TokensArgs(token)).toStrictEqual([
      [token[0].token, token[1].token],
      [token[0].amount, token[1].amount],
    ]);
  });

  test('prepareERC721TokensArgs()', () => {
    const token: MigrationERC721Token[] = [
      {
        token: 'A',
        id: 1,
        useLegacyTransferMethod: false,
      },
      {
        token: 'B',
        id: 2,
        useLegacyTransferMethod: true,
      },
    ];

    expect(prepareERC721TokensArgs([])).toStrictEqual([[], [], []]);
    expect(prepareERC721TokensArgs(token.slice(0, 1))).toStrictEqual([
      [token[0].token],
      [token[0].id],
      [token[0].useLegacyTransferMethod],
    ]);
    expect(prepareERC721TokensArgs(token)).toStrictEqual([
      [token[0].token, token[1].token],
      [token[0].id, token[1].id],
      [token[0].useLegacyTransferMethod, token[1].useLegacyTransferMethod],
    ]);
  });
});
