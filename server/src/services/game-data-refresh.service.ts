import { prisma } from '../db.js';
import { reloadAllGameData } from '../game-data/index.js';

let loadedGameDataVersion = '';
let pendingRefresh: Promise<void> | null = null;

export async function refreshGameDataForVersion(version: string): Promise<void> {
  if (!version || version === loadedGameDataVersion) {
    return;
  }

  if (pendingRefresh) {
    await pendingRefresh;
    if (version === loadedGameDataVersion) {
      return;
    }
  }

  console.log(`Refreshing game data for ${version}...`);
  pendingRefresh = reloadAllGameData(version)
    .then(() => {
      loadedGameDataVersion = version;
      console.log(`Game data refreshed for ${version}.`);
    })
    .finally(() => {
      pendingRefresh = null;
    });

  await pendingRefresh;
}

export async function refreshGameDataForLatestTournament(): Promise<string | null> {
  const result = await prisma.tournament.findFirst({
    orderBy: { label: 'desc' },
    select: { label: true },
  });
  const latestTournament = result?.label ?? null;

  if (latestTournament) {
    await refreshGameDataForVersion(latestTournament);
  }

  return latestTournament;
}