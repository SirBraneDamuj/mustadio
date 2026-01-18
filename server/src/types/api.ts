import type { ClassGender, Item, Ability, Status, TotalStats } from './game-data.js';

export interface ApiUnit {
  name: string;
  gender: string;
  zodiac: string;
  brave: string;
  faith: string;
  tournamentId: string;
  teamName: string;
  class: ApiClassGender;
  abilities: ApiUnitAbilities | Record<string, never>;
  equipment: ApiItem[];
  stats?: TotalStats;
}

export interface ApiClassGender {
  name: string;
  gender: string;
  baseStats?: ClassGender['baseStats'];
  innates?: (Ability | Status | null)[];
  raw?: string;
}

export interface ApiUnitAbilities {
  mainActive: ApiActiveAbility;
  subActive: ApiActiveAbility;
  react: ApiAbility;
  support: ApiAbility;
  move: ApiAbility;
}

export interface ApiActiveAbility {
  name: string | null;
  learned: ApiLearnedAbility[];
}

export interface ApiLearnedAbility {
  name: string;
  info?: string;
}

export interface ApiAbility {
  name: string;
  info?: string;
  type?: string;
}

export interface ApiItem {
  name: string;
  type?: string;
  slot?: string;
  info?: string;
  stats?: Partial<Item['stats']>;
}

export interface ApiTeam {
  tournamentId: string;
  teamName: string;
  units: ApiUnit[];
}

export interface ApiTournament {
  id: string;
  teams: ApiTeam[];
}

export interface ApiMatch {
  match: {
    team1: {
      name: string;
      units: ApiUnit[];
    };
    team2: {
      name: string;
      units: ApiUnit[];
    };
    matchNumber: number;
  };
  tournament: {
    tournamentId: string;
    maps: { number: string; title: string; order: number }[];
  };
}

export interface ApiLatestMatch {
  tournamentId: string;
  team1: string;
  team2: string;
}

export interface ApiDataResponse {
  items: Record<string, ApiItem>;
  abilities: Record<string, ApiAbility>;
  classes: Record<string, Record<string, ApiClassGender>>;
  statuses: Record<string, Status>;
  monsterSkills: Record<string, string[]>;
}
