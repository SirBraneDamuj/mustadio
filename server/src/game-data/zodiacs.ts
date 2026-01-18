import { DumpLoader } from './dump-loader.js';
import { fftbgClient } from '../clients/fftbg/index.js';
import type { Zodiac } from '../types/game-data.js';

function parseZodiacLine(data: Record<string, Zodiac>, zodiacLine: string): void {
  const parts = zodiacLine.split(' compatibility: ');
  if (parts.length < 2) return;

  const name = parts[0] ?? '';
  const info = parts[1] ?? '';

  data[name.toLowerCase()] = {
    name,
    info,
  };
}

const zodiacLoader = new DumpLoader<Zodiac>(() => fftbgClient.zodiacInfo(), parseZodiacLine);

export function getZodiacs(): Record<string, Zodiac> {
  return zodiacLoader.getData();
}

export function getZodiac(zodiac: string): Zodiac | undefined {
  return zodiacLoader.getData()[zodiac.toLowerCase()];
}

export async function reload(version: string): Promise<void> {
  await zodiacLoader.reload(version);
}
