import { describe, expect, it, vi } from 'vitest';
import { DumpLoader } from '../../src/game-data/dump-loader.js';

describe('DumpLoader', () => {
  it('replaces cached data when loading a new version', async () => {
    const getDump = vi
      .fn()
      .mockResolvedValueOnce({ data: 'Alpha: first\nBeta: second' })
      .mockResolvedValueOnce({ data: 'Alpha: updated' });

    const loader = new DumpLoader<string>(getDump, (data, line) => {
      const [name, value] = line.split(': ');
      if (name && value) {
        data[name] = value;
      }
    });

    await loader.reload('one');
    expect(loader.getData()).toEqual({ Alpha: 'first', Beta: 'second' });

    await loader.reload('two');
    expect(loader.getData()).toEqual({ Alpha: 'updated' });
  });

  it('skips fetching when the requested version is already loaded', async () => {
    const getDump = vi.fn().mockResolvedValue({ data: 'Alpha: first' });
    const loader = new DumpLoader<string>(getDump, (data, line) => {
      const [name, value] = line.split(': ');
      if (name && value) {
        data[name] = value;
      }
    });

    await loader.reload('one');
    await loader.reload('one');

    expect(getDump).toHaveBeenCalledTimes(1);
  });
});