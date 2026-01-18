export interface ItemStats {
  wp: number;
  healWp: number;
  absorbWp: number;
  range: number;
  evadePercent: number;
  physEvadePercent: number;
  magicEvadePercent: number;
  hp: number;
  mp: number;
  element: string | undefined;
  speed: number;
  move: number;
  jump: number;
  pa: number;
  ma: number;
  initialStatuses: string[];
  permStatuses: string[];
}

export interface Item {
  name: string;
  type: string;
  slot: string;
  info: string;
  stats: ItemStats;
}

export interface Ability {
  name: string;
  info: string;
  type: 'active' | 'react' | 'support' | 'move';
}

export interface ClassBaseStats {
  hp: number;
  mp: number;
  move: number;
  jump: number;
  speed: number;
  pa: number;
  ma: number;
  cEvPercent: number;
}

export interface ClassGender {
  name: string;
  gender: string;
  baseStats: ClassBaseStats;
  innates: string[];
  raw: string;
}

export interface ClassData {
  Male?: ClassGender;
  Female?: ClassGender;
  Monster?: ClassGender;
}

export interface Status {
  name: string;
  info: string;
}

export interface Zodiac {
  name: string;
  info: string;
}

export type Gender = 'Male' | 'Female' | 'Monster';

export type EquipmentSlot = 'hand' | 'head' | 'body' | 'accessory';

export type TeamName = 'red' | 'blue' | 'green' | 'yellow' | 'white' | 'black' | 'purple' | 'brown' | 'champion';

export interface ParsedUnit {
  name: string;
  gender: string;
  zodiac: string;
  brave: string;
  faith: string;
  class: string;
  subSkill: string;
  reactSkill: string;
  supportSkill: string;
  moveSkill: string;
  mainAbilities: string[];
  subAbilities: string[];
  gear: string[];
  raw: string;
}

export interface ParsedMap {
  number: string;
  title: string;
}

export interface TotalStats {
  cEvPercent: number;
  sPhysEvPercent: number;
  sMagEvPercent: number;
  aPhysEvPercent: number;
  aMagEvPercent: number;
  hp: number;
  mp: number;
  speed: number;
  move: number;
  jump: number;
  pa: number;
  ma: number;
  initialStatuses: string[];
  permStatuses: string[];
}
