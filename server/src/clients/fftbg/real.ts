import { config } from '../../config.js';
import type { FftbgClient, FftbgResponse } from '../types.js';

async function fetchText(path: string): Promise<FftbgResponse> {
  const response = await fetch(`${config.FFTBG_BASE_URL}${path}`);
  const data = await response.text();
  return { data };
}

export const realClient: FftbgClient = {
  classInfo: () => fetchText('/classhelp.txt'),
  itemInfo: () => fetchText('/infoitem.txt'),
  abilityInfo: () => fetchText('/infoability.txt'),
  statusInfo: () => fetchText('/infostatus.txt'),
  zodiacInfo: () => fetchText('/zodiachelp.txt'),
  monsters: () => fetchText('/Monsters.txt'),
  monsterSkills: () => fetchText('/MonsterSkills.txt'),
  tournamentTeam: (tournamentId, teamName) => fetchText(`/${tournamentId}/${teamName}.txt`),
  tournamentMaps: (tournamentId) => fetchText(`/${tournamentId}/maps.txt`),
  tournamentWinners: async (tournamentId) => {
    try {
      return await fetchText(`/${tournamentId}/winner.txt`);
    } catch {
      return { data: '' };
    }
  },
  tournamentList: () => fetchText('/'),
};
