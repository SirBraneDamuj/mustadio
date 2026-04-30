import { DumpLoader } from './dump-loader.js';
import { fftbgClient } from '../clients/fftbg/index.js';
import type { Ability } from '../types/game-data.js';

const abilityTypesFromFile = ['Reaction', 'Support', 'Movement'] as const;
const fileAbilityTypeMapping: Record<string, Ability['type']> = {
  Reaction: 'react',
  Support: 'support',
  Movement: 'move',
};

const actives: Record<string, string> = {
  Squire: 'Basic Skill',
  Chemist: 'Item',
  Knight: 'Battle Skill',
  Archer: 'Charge',
  Monk: 'Punch Art',
  Priest: 'White Magic',
  Wizard: 'Black Magic',
  TimeMage: 'Time Magic',
  'Time Mage': 'Time Magic',
  Summoner: 'Summon Magic',
  Thief: 'Steal',
  Mediator: 'Talk Skill',
  Oracle: 'Yin Yang Magic',
  Geomancer: 'Elemental',
  Lancer: 'Jump',
  Samurai: 'Draw Out',
  Ninja: 'Throw',
  Calculator: 'Math Skill',
  Bard: 'Sing',
  Mime: 'Mimic',
  Dancer: 'Dance',
};

function parseAbilityLine(data: Record<string, Ability>, abilityLine: string): void {
  const firstColon = abilityLine.indexOf(':');
  if (firstColon === -1) return;

  const name = abilityLine.slice(0, firstColon);
  const info = abilityLine.slice(firstColon + 2);
  const abilityType = abilityTypesFromFile.find((type) => info.startsWith(`${type}. `));
  const realAbilityType: Ability['type'] = abilityType
    ? fileAbilityTypeMapping[abilityType] ?? 'active'
    : 'active';

  data[name] = {
    name,
    info,
    type: realAbilityType,
  };
}

const abilityLoader = new DumpLoader<Ability>(() => fftbgClient.abilityInfo(), parseAbilityLine);

export function getAbilities(): Record<string, Ability> {
  return abilityLoader.getData();
}

export function getAbility(abilityName: string): Ability | undefined {
  return abilityLoader.getData()[abilityName];
}

export function mainActiveForClass(className: string): string | null {
  return actives[className] ?? null;
}

export const activeAbilities = new Set(Object.values(actives));

export async function reload(version: string): Promise<void> {
  await abilityLoader.reload(version);
}
