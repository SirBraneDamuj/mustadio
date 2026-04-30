import { DumpLoader } from './dump-loader.js';
import { fftbgClient } from '../clients/fftbg/index.js';
import { SLOTS_FOR_EQUIPMENT_TYPES } from './constants.js';
import type { Item, ItemStats, EquipmentSlot } from '../types/game-data.js';

function toNumber(s: string | undefined): number {
  if (!s) return 0;
  return parseInt(s, 10);
}

const theBigRegex =
  /^(?<itemName>[A-Z\d][\w\d \-']+): (?:(?<wp>\d+) WP, )?(?:(?<healWp>\d+) WP \(heal(?:ing)?\), )?(?:(?<absorbWp>\d+) WP \(absorb(?:ing)?\), )?(?:(?<range>\d+) (?:range|range \(\w+\)), )?(?:(?<evadePercent>\d+%?) evade, )?(?:(?<physEvadePercent>\d+%) physical evade, )?(?:(?<magicEvadePercent>\d+%) magic evade, )?(?:\+(?<hp>\d+) HP, )?(?:\+(?<mp>\d+) MP, )?(?:(?<itemType>[A-Z][\w -]+(?: \((?:\w|\s)+\))?). ?)(?:Element: (?<element>[A-Z]\w+)\. ?)?(?:Effect: (?<effect>.*))?$/;

const statsRegex =
  /[^+]*(?:(?<pa>\+\d+) PA(?:, |\.|;))?(?:(?<ma>\+\d+) MA(?:, |\.|;))?(?:(?<speed>\+\d+) Speed(?:, |\.|;))?(?:(?<move>\+\d+) Move(?:, |\.|;))?(?:(?<jump>\+\d+) Jump(?:, |\.|;))?/;

const initialStatusRegex = /Initial (?<initialStatuses>[A-Z][^;.]+)(?:; |\.)/;
const permanentStatusRegex = /(?:Permanent|Always) (?<permStatuses>[A-Z][^;.]+)(?:; |\.)/;

function getInitialStatuses(effect: string | undefined): string[] {
  if (!effect) return [];
  const match = initialStatusRegex.exec(effect);
  if (match?.groups?.initialStatuses) {
    return match.groups.initialStatuses.split(', ');
  }
  return [];
}

function getPermStatuses(effect: string | undefined): string[] {
  if (!effect) return [];
  const match = permanentStatusRegex.exec(effect);
  if (match?.groups?.permStatuses) {
    return match.groups.permStatuses.split(', ');
  }
  return [];
}

function parseDumpLine(items: Record<string, Item>, itemLine: string): void {
  const regexMatch = theBigRegex.exec(itemLine);
  if (!regexMatch?.groups) {
    return;
  }
  const {
    itemName,
    wp,
    healWp,
    absorbWp,
    range,
    evadePercent,
    physEvadePercent,
    magicEvadePercent,
    hp,
    mp,
    itemType,
    element,
    effect,
  } = regexMatch.groups;

  if (!itemName || !itemType) return;

  if (itemType === 'Shuriken' || itemType === 'Bomb' || itemType === 'Consumable') {
    return;
  }

  const statsMatch = statsRegex.exec(effect ?? '');
  const { speed, move, jump, pa, ma } = statsMatch?.groups ?? {};

  const baseType = itemType.split('(')[0]?.trim() ?? itemType;
  const slot: EquipmentSlot = SLOTS_FOR_EQUIPMENT_TYPES[baseType] ?? 'accessory';

  const firstColon = itemLine.indexOf(':');
  const info = itemLine.slice(firstColon + 2);

  const stats: ItemStats = {
    wp: toNumber(wp),
    healWp: toNumber(healWp),
    absorbWp: toNumber(absorbWp),
    range: toNumber(range),
    evadePercent: toNumber(evadePercent),
    physEvadePercent: toNumber(physEvadePercent),
    magicEvadePercent: toNumber(magicEvadePercent),
    hp: toNumber(hp),
    mp: toNumber(mp),
    element,
    speed: toNumber(speed),
    move: toNumber(move),
    jump: toNumber(jump),
    pa: toNumber(pa),
    ma: toNumber(ma),
    initialStatuses: getInitialStatuses(effect),
    permStatuses: getPermStatuses(effect),
  };

  items[itemName] = {
    name: itemName,
    type: itemType,
    slot,
    info,
    stats,
  };
}

const itemLoader = new DumpLoader<Item>(() => fftbgClient.itemInfo(), parseDumpLine);

export function getItems(): Record<string, Item> {
  return itemLoader.getData();
}

export function getItem(itemName: string): Item | undefined {
  return itemLoader.getData()[itemName];
}

export async function reload(version: string): Promise<void> {
  await itemLoader.reload(version);
}
