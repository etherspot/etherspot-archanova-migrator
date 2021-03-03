export class MigratorException extends Error {
  constructor(message: string, readonly data?: any) {
    super(`MigratorException: ${message}`);
  }
}
