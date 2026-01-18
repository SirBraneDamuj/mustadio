import type { EquipmentSlot, Gender, TeamName } from '../types/game-data.js';

export const EQUIPMENT_SLOTS: EquipmentSlot[] = ['hand', 'head', 'body', 'accessory'];

export const EQUIPMENT_TYPES_FOR_SLOT: Record<EquipmentSlot, string[]> = {
  hand: [
    'Knife', 'Ninja Blade', 'Sword', 'Knight Sword', 'Katana', 'Axe', 'Rod', 'Staff',
    'Flail', 'Gun', 'Crossbow', 'Bow', 'Harp', 'Book', 'Spear', 'Pole', 'Bag', 'Fabric', 'Shield'
  ],
  head: ['Helmet', 'Hat'],
  body: ['Armor', 'Clothes', 'Clothing', 'Robe'],
  accessory: ['Accessory'],
};

export const SLOTS_FOR_EQUIPMENT_TYPES: Record<string, EquipmentSlot> = EQUIPMENT_SLOTS.reduce(
  (accumulator, slot) => {
    EQUIPMENT_TYPES_FOR_SLOT[slot].forEach((type) => {
      accumulator[type] = slot;
    });
    return accumulator;
  },
  {} as Record<string, EquipmentSlot>
);

export const GENDERS: Gender[] = ['Male', 'Female', 'Monster'];

export const TEAM_NAMES = [
  'red', 'blue', 'green', 'yellow', 'white', 'black', 'purple', 'brown', 'champion'
] as const satisfies readonly TeamName[];

// Explicitly typed team names for matchups
const red: TeamName = 'red';
const blue: TeamName = 'blue';
const green: TeamName = 'green';
const yellow: TeamName = 'yellow';
const white: TeamName = 'white';
const black: TeamName = 'black';
const purple: TeamName = 'purple';
const brown: TeamName = 'brown';
const champion: TeamName = 'champion';

type Matchup = [TeamName, TeamName];

export const MATCHUPS: Matchup[][] = [
  // ROUND 1
  [[red, blue]],
  [[green, yellow]],
  [[white, black]],
  [[purple, brown]],
  // ROUND 2
  [
    [red, green],
    [red, yellow],
    [blue, green],
    [blue, yellow],
  ],
  [
    [white, purple],
    [white, brown],
    [black, purple],
    [black, brown],
  ],
  // ROUND 3
  [
    [red, white],
    [red, black],
    [red, purple],
    [red, brown],
    [blue, white],
    [blue, black],
    [blue, purple],
    [blue, brown],
    [green, white],
    [green, black],
    [green, purple],
    [green, brown],
    [yellow, white],
    [yellow, black],
    [yellow, purple],
    [yellow, brown],
  ],
  // ROUND 4 (Champion matches)
  [
    [red, champion],
    [blue, champion],
    [green, champion],
    [yellow, champion],
    [white, champion],
    [black, champion],
    [purple, champion],
    [brown, champion],
  ],
];

export function matchNumberForMatchup(team1: string, team2: string): number {
  return MATCHUPS.findIndex((match) =>
    match.some(([t1, t2]) => t1 === team1 && t2 === team2)
  );
}
