import { isAddress, prepareTokensArgs } from './utils';
import { MigrationToken } from './interfaces';

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

  test('prepareTokensArgs()', () => {
    const token: MigrationToken[] = [
      {
        token: 'A',
        amount: 1,
      },
      {
        token: 'B',
        amount: 2,
      },
    ];

    expect(prepareTokensArgs([])).toStrictEqual([[], []]);
    expect(prepareTokensArgs(token.slice(0, 1))).toStrictEqual([
      [token[0].token],
      [token[0].amount],
    ]);
    expect(prepareTokensArgs(token)).toStrictEqual([
      [token[0].token, token[1].token],
      [token[0].amount, token[1].amount],
    ]);
  });
});
