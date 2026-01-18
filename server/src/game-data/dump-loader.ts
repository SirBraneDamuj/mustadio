import type { FftbgResponse } from '../clients/fftbg/index.js';

type GetDumpFn = () => Promise<FftbgResponse>;
type ParseDumpFn<T> = (data: Record<string, T>, line: string) => void;

export class DumpLoader<T> {
  private getDumpFn: GetDumpFn;
  private parseDumpFn: ParseDumpFn<T>;
  private lastVersion: string = '';
  private data: Record<string, T> = {};

  constructor(getDumpFn: GetDumpFn, parseDumpFn: ParseDumpFn<T>) {
    this.getDumpFn = getDumpFn;
    this.parseDumpFn = parseDumpFn;
  }

  async reload(version: string): Promise<void> {
    if (version === this.lastVersion) {
      return;
    }
    const { data } = await this.getDumpFn();
    let delimiter = '\r\n';
    if (!data.includes(delimiter)) {
      delimiter = '\n';
    }
    data
      .trim()
      .split(delimiter)
      .forEach((line) => {
        this.parseDumpFn(this.data, line);
      });
    this.lastVersion = version;
  }

  getData(): Record<string, T> {
    return this.data;
  }
}
