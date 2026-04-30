import { DumpLoader } from './dump-loader.js';
import { fftbgClient } from '../clients/fftbg/index.js';

interface SkillsData {
  skills: string[][];
}

interface MonstersData {
  monsters: string[];
}

function parseMonsterSkillsLine(data: Record<string, SkillsData>, line: string): void {
  const skills = line.split('|');
  if (!data['_data']) {
    data['_data'] = { skills: [] };
  }
  data['_data'].skills.push(skills);
}

function parseMonstersLine(data: Record<string, MonstersData>, line: string): void {
  if (!data['_data']) {
    data['_data'] = { monsters: [] };
  }
  data['_data'].monsters.push(line);
}

const skillsLoader = new DumpLoader<SkillsData>(
  () => fftbgClient.monsterSkills(),
  parseMonsterSkillsLine
);

const monstersLoader = new DumpLoader<MonstersData>(
  () => fftbgClient.monsters(),
  parseMonstersLine
);

export function getSkillsForMonster(monsterName: string): string[] | undefined {
  const monstersData = monstersLoader.getData()['_data'];
  const skillsData = skillsLoader.getData()['_data'];

  if (!monstersData || !skillsData) return undefined;

  const index = monstersData.monsters.indexOf(monsterName);
  if (index === -1) return undefined;

  return skillsData.skills[index];
}

export function getAllMonsterSkills(): Record<string, string[]> {
  const monstersData = monstersLoader.getData()['_data'];
  const skillsData = skillsLoader.getData()['_data'];

  if (!monstersData || !skillsData) return {};

  const skillsMap: Record<string, string[]> = {};
  for (const [index, monster] of monstersData.monsters.entries()) {
    const skills = skillsData.skills[index];
    if (skills) {
      skillsMap[monster] = skills;
    }
  }
  return skillsMap;
}

export async function reload(version: string): Promise<void> {
  await Promise.all([skillsLoader.reload(version), monstersLoader.reload(version)]);
}
