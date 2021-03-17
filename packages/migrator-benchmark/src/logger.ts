import { pathExists, unlink, appendFile } from 'fs-extra';

export class Logger {
  constructor(private filePath: string) {
    //
  }

  async reset(): Promise<void> {
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

  async log(...args: any[]): Promise<void> {
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
            result = `${arg}`;
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
