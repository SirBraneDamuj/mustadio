import { z } from 'zod';

// Helper for coercing string/number to number (API sometimes returns strings)
const coerceNumber = z.coerce.number();

// ============ Basic Types ============

export const GenderSchema = z.enum(['Male', 'Female', 'Monster']);
export type Gender = z.infer<typeof GenderSchema>;

export const SideSchema = z.enum(['left', 'right']);
export type Side = z.infer<typeof SideSchema>;

// ============ Ability Schemas ============

export const LearnedAbilitySchema = z.object({
  name: z.string(),
  info: z.string().optional(),
});
export type LearnedAbility = z.infer<typeof LearnedAbilitySchema>;

export const ActiveAbilitySlotSchema = z.object({
  name: z.string(),
  learned: z.array(LearnedAbilitySchema),
});
export type ActiveAbilitySlot = z.infer<typeof ActiveAbilitySlotSchema>;

export const NonActiveAbilitySlotSchema = z.object({
  name: z.string(),
  info: z.string().optional(),
  type: z.string().optional(),
});
export type NonActiveAbilitySlot = z.infer<typeof NonActiveAbilitySlotSchema>;

export const UnitAbilitiesSchema = z.object({
  mainActive: ActiveAbilitySlotSchema,
  subActive: ActiveAbilitySlotSchema,
  react: NonActiveAbilitySlotSchema,
  support: NonActiveAbilitySlotSchema,
  move: NonActiveAbilitySlotSchema,
});
export type UnitAbilities = z.infer<typeof UnitAbilitiesSchema>;

// ============ Class Schemas ============

export const InnateSchema = z.object({
  name: z.string(),
  info: z.string().optional(),
  type: z.string().optional(),
});
export type Innate = z.infer<typeof InnateSchema>;

export const ClassGenderSchema = z.object({
  name: z.string(),
  gender: GenderSchema,
  raw: z.string().optional(),
  innates: z.array(InnateSchema).optional(),
  baseStats: z.record(z.string(), coerceNumber).optional(),
});
export type ClassGender = z.infer<typeof ClassGenderSchema>;

// ============ Stats Schema ============

export const UnitStatsSchema = z.object({
  hp: coerceNumber,
  mp: coerceNumber,
  speed: coerceNumber,
  pa: coerceNumber,
  ma: coerceNumber,
  move: coerceNumber,
  jump: coerceNumber,
  cEvPercent: coerceNumber,
  sPhysEvPercent: coerceNumber,
  sMagEvPercent: coerceNumber,
  aPhysEvPercent: coerceNumber,
  aMagEvPercent: coerceNumber,
  initialStatuses: z.array(z.string()).optional(),
  permStatuses: z.array(z.string()).optional(),
});
export type UnitStats = z.infer<typeof UnitStatsSchema>;

// ============ Equipment Schema ============

export const EquipmentItemSchema = z.object({
  name: z.string(),
  info: z.string().optional(),
  slot: z.string().optional(),
  type: z.string().optional(),
  stats: z.record(z.string(), z.union([coerceNumber, z.array(z.unknown())])).optional(),
});
export type EquipmentItem = z.infer<typeof EquipmentItemSchema>;

// ============ Unit Schema ============

export const UnitSchema = z.object({
  name: z.string(),
  gender: GenderSchema,
  zodiac: z.string(),
  brave: coerceNumber,
  faith: coerceNumber,
  tournamentId: z.string(),
  teamName: z.string(),
  class: ClassGenderSchema,
  abilities: UnitAbilitiesSchema.partial().default({}),
  equipment: z.array(EquipmentItemSchema).default([]),
  stats: UnitStatsSchema,
});
export type Unit = z.infer<typeof UnitSchema>;

// ============ Team Schema ============

export const TeamSchema = z.object({
  name: z.string(),
  units: z.array(UnitSchema),
});
export type Team = z.infer<typeof TeamSchema>;

// ============ Match Schema ============

export const MatchSchema = z.object({
  team1: TeamSchema,
  team2: TeamSchema,
  matchNumber: coerceNumber,
});
export type Match = z.infer<typeof MatchSchema>;

// ============ Map Schema ============

export const MapInfoSchema = z.object({
  number: z.string(),
  title: z.string(),
  order: coerceNumber,
});
export type MapInfo = z.infer<typeof MapInfoSchema>;

// ============ Tournament Schema ============

export const TournamentSchema = z.object({
  tournamentId: z.string(),
  maps: z.array(MapInfoSchema),
});
export type Tournament = z.infer<typeof TournamentSchema>;

// ============ API Response Schemas ============

// GET /api/match - returns latest match identifiers
export const LatestMatchResponseSchema = z.object({
  tournamentId: z.string(),
  team1: z.string(),
  team2: z.string(),
});
export type LatestMatchResponse = z.infer<typeof LatestMatchResponseSchema>;

// GET /api/match/:tournamentId/:team1/:team2 - returns full match data
export const FullMatchResponseSchema = z.object({
  match: MatchSchema,
  tournament: TournamentSchema,
});
export type FullMatchResponse = z.infer<typeof FullMatchResponseSchema>;

// ============ Game Data Schemas ============

export const ItemDataSchema = z.object({
  name: z.string(),
  info: z.string().optional(),
  slot: z.string().optional(),
  type: z.string().optional(),
  stats: z.record(z.string(), z.unknown()).optional(),
});
export type ItemData = z.infer<typeof ItemDataSchema>;

export const AbilityDataSchema = z.object({
  name: z.string(),
  info: z.string().optional(),
  type: z.string().optional(),
});
export type AbilityData = z.infer<typeof AbilityDataSchema>;

export const StatusDataSchema = z.object({
  name: z.string(),
  info: z.string().optional(),
});
export type StatusData = z.infer<typeof StatusDataSchema>;

// GET /api/data - returns all game reference data
export const GameDataResponseSchema = z.object({
  items: z.record(z.string(), ItemDataSchema),
  abilities: z.record(z.string(), AbilityDataSchema),
  classes: z.record(z.string(), z.record(z.string(), ClassGenderSchema)),
  statuses: z.record(z.string(), StatusDataSchema),
  monsterSkills: z.record(z.string(), z.array(z.string())),
});
export type GameDataResponse = z.infer<typeof GameDataResponseSchema>;

// ============ Context Type ============

export interface FftbgContextValue {
  match: Match;
  tournament: Tournament;
  data: GameDataResponse;
  currentMap: MapInfo;
  loadLatestMatch: () => void;
}
