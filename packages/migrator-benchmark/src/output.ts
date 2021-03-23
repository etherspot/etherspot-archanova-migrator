import { pathExists, unlink, appendFile } from 'fs-extra';

export class Output {
  constructor(private filePath: string, private enabled = true) {
    //
  }

  async reset(): Promise<void> {
    if (!this.enabled) {
      return;
    }

    console.clear();

    if (await pathExists(this.filePath)) {
      await unlink(this.filePath);
    }

    const line = '# Benchmark';

    console.log(line);
    console.log('');

    await appendFile(this.filePath, `${line}\n\n`, {
      encoding: 'utf8',
    });
  }

  async write(...args: any[]): Promise<void> {
    if (!this.enabled) {
      return;
    }

    const line = `| ${args
      .map(arg => {
        let result: string;

        switch (typeof arg) {
          case 'number':
            if (!arg) {
              result = '❌';
            } else {
              result = `\`${arg}\``;
            }
            break;

          case 'boolean':
            result = arg ? '✅' : '❌';
            break;

          default:
            result = arg instanceof Error ? '👎' : `${arg}`;
        }

        return result;
      })
      .join(' | ')} |`;

    console.log(line);

    await appendFile(this.filePath, `${line}\n`, {
      encoding: 'utf8',
    });
  }
}
