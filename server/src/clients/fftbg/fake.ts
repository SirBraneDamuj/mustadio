import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { FftbgClient, FftbgResponse } from '../types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const resourcesPath = join(__dirname, '..', '..', '..', 'resources', 'fftbg_fake');

function readFakeFile(filename: string): FftbgResponse {
  const data = readFileSync(join(resourcesPath, filename), 'utf-8');
  return { data };
}

export const fakeClient: FftbgClient = {
  classInfo: () => Promise.resolve(readFakeFile('classhelp.txt')),
  itemInfo: () => Promise.resolve(readFakeFile('infoitem.txt')),
  abilityInfo: () => Promise.resolve(readFakeFile('infoability.txt')),
  statusInfo: () => Promise.resolve(readFakeFile('infostatus.txt')),
  zodiacInfo: () => Promise.resolve(readFakeFile('zodiachelp.txt')),
  monsters: () => Promise.resolve(readFakeFile('Monsters.txt')),
  monsterSkills: () => Promise.resolve(readFakeFile('MonsterSkills.txt')),
  tournamentTeam: (_tournamentId, teamName) =>
    Promise.resolve(readFakeFile(`fake_tournament/${teamName}.txt`)),
  tournamentMaps: () => Promise.resolve(readFakeFile('fake_tournament/maps.txt')),
  tournamentWinners: (tournamentId) => {
    let filename: string;
    if (tournamentId === 'start') {
      filename = 'winner_start.txt';
    } else if (tournamentId === 'half') {
      filename = 'winner_half.txt';
    } else {
      filename = 'winner_complete.txt';
    }
    return Promise.resolve(readFakeFile(`fake_tournament/${filename}`));
  },
  tournamentList: () => Promise.resolve(readFakeFile('index.html')),
};
