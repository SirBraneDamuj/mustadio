import { GENDERS } from '../game-data/constants.js';
import type { ParsedUnit, Gender } from '../types/game-data.js';

function unitForTokens(unitTokens: string[]): ParsedUnit {
  const gender = unitTokens[1] as Gender;
  const monster = gender === 'Monster';
  const clazz = unitTokens[5];
  const mime = clazz === 'Mime';

  // Clone array to avoid mutating input
  const tokens = [...unitTokens];

  if (mime) {
    tokens.splice(6, 0, '');
    tokens.push('');
  }

  const mainAbilitiesStr = tokens[tokens.length - 2] ?? '';
  const subAbilitiesStr = tokens[tokens.length - 1] ?? '';

  const mainAbilities = mainAbilitiesStr.split(', ').filter(Boolean);
  const subAbilities = subAbilitiesStr.split(', ').filter(Boolean);
  const gear = tokens.slice(10, tokens.length - 2).filter((s) => s !== '');

  return {
    name: tokens[0] ?? '',
    gender: tokens[1] ?? '',
    zodiac: tokens[2] ?? '',
    brave: tokens[3] ?? '',
    faith: tokens[4] ?? '',
    class: tokens[5] ?? '',
    subSkill: tokens[6] ?? '',
    reactSkill: tokens[7] ?? '',
    supportSkill: tokens[8] ?? '',
    moveSkill: tokens[9] ?? '',
    mainAbilities: !monster ? mainAbilities : [],
    subAbilities: !monster && !mime ? subAbilities : [],
    gear,
    raw: tokens.join(' - '),
  };
}

export function parseTeam(teamData: string): ParsedUnit[] {
  let delimiter = '\r\n';
  if (!teamData.includes(delimiter)) {
    delimiter = '\n';
  }

  const tokens = teamData
    .split(delimiter)
    .slice(3) // Skip header lines
    .filter((s) => s !== '');

  let index = 0;
  let lastUnitIndex = -1;
  const unitStrings: string[][] = [];

  while (unitStrings.length < 4 && index < tokens.length) {
    const thisToken = tokens[index];
    if (thisToken && GENDERS.includes(thisToken as Gender)) {
      if (lastUnitIndex !== -1) {
        unitStrings.push(tokens.slice(lastUnitIndex, index - 1));
      }
      lastUnitIndex = index - 1;
    }
    index += 1;
  }

  if (lastUnitIndex !== -1) {
    unitStrings.push(tokens.slice(lastUnitIndex));
  }

  if (unitStrings.length !== 4) {
    throw new Error(`Found unexpected number (${unitStrings.length}) of units`);
  }

  return unitStrings.map(unitForTokens);
}
