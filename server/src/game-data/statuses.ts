import { DumpLoader } from './dump-loader.js';
import { fftbgClient } from '../clients/fftbg/index.js';
import type { Status } from '../types/game-data.js';

function parseStatusLine(statuses: Record<string, Status>, statusLine: string): void {
  const firstColon = statusLine.indexOf(':');
  if (firstColon === -1) return;

  const name = statusLine.slice(0, firstColon);
  const info = statusLine.slice(firstColon + 2);

  statuses[name] = {
    name,
    info,
  };
}

const statusLoader = new DumpLoader<Status>(() => fftbgClient.statusInfo(), parseStatusLine);

export function getStatuses(): Record<string, Status> {
  return statusLoader.getData();
}

export function getStatus(statusName: string): Status | undefined {
  return statusLoader.getData()[statusName];
}

export async function reload(version: string): Promise<void> {
  await statusLoader.reload(version);
}
