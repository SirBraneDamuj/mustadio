// Unit and Team types
export interface LearnedAbility {
  name: string;
}

export interface AbilitySlot {
  learned?: LearnedAbility[];
  name?: string;
}

export interface UnitAbilities {
  mainActive?: AbilitySlot;
  subActive?: AbilitySlot;
  reaction?: AbilitySlot;
  support?: AbilitySlot;
  movement?: AbilitySlot;
}

export interface UnitClass {
  name: string;
}

export interface UnitStats {
  hp: number;
  mp: number;
  speed: number;
  pa: number;
  ma: number;
  move: number;
  jump: number;
  cEv: number;
  initialStatuses?: string[];
  permStatuses?: string[];
}

export interface UnitEquipmentItem {
  name: string;
  slot: string;
}

export interface Unit {
  name: string;
  gender: 'Male' | 'Female' | 'Monster';
  sign: string;
  brave: number;
  faith: number;
  class: UnitClass;
  stats: UnitStats;
  equipment: UnitEquipmentItem[];
  abilities: UnitAbilities;
}

export interface Team {
  name: string;
  units: Unit[];
}

export interface Match {
  team1: Team;
  team2: Team;
  matchNumber: number;
}

// Tournament types
export interface MapInfo {
  number: number;
  name: string;
}

export interface Tournament {
  tournamentId: string;
  maps: MapInfo[];
}

// Game data types
export interface ItemInfo {
  name: string;
  description?: string;
  stats?: Record<string, number>;
}

export interface AbilityInfo {
  name: string;
  description?: string;
  mp?: number;
  range?: number;
}

export interface ClassInfo {
  name: string;
  baseStats?: Partial<UnitStats>;
}

export interface StatusInfo {
  name: string;
  description?: string;
}

export interface GameData {
  items: Record<string, ItemInfo>;
  abilities: Record<string, AbilityInfo>;
  classes: Record<string, ClassInfo>;
  statuses: Record<string, StatusInfo>;
  monsterSkills: Record<string, string[]>;
}

// Context types
export interface FftbgContextValue {
  match: Match;
  tournament: Tournament;
  data: GameData;
  currentMap?: MapInfo;
  loadLatestMatch: () => void;
}

// API response types
export interface MatchResponse {
  tournamentId: string;
  team1: string;
  team2: string;
}

export interface FullMatchResponse extends Match {
  tournament: Tournament;
}

// Component prop types
export type Side = 'left' | 'right';
