import { getTeamsForTournament, getMapsForTournament } from './tournament.service.js';
import { getItem } from '../game-data/items.js';
import { getClasses } from '../game-data/classes.js';
import { totalStatsForClassAndEquipment } from '../game-data/stats.js';
import { matchNumberForMatchup } from '../game-data/constants.js';
import type { Item, Gender } from '../types/game-data.js';

interface UnitWithStats {
  name: string;
  gender: string;
  zodiac: string;
  brave: string;
  faith: string;
  className: string;
  subSkill: string | null;
  reactSkill: string | null;
  supportSkill: string | null;
  moveSkill: string | null;
  order: number;
  abilities: { name: string; mainOrSub: string }[];
  equipment: { name: string }[];
  stats: ReturnType<typeof totalStatsForClassAndEquipment>;
}

export async function getMatchData(tournamentId: string, team1: string, team2: string) {
  const maps = await getMapsForTournament(tournamentId);
  const [team1Record, team2Record] = await getTeamsForTournament(tournamentId, team1, team2);

  const unitFormatter = (unit: NonNullable<typeof team1Record>['units'][number]): UnitWithStats => {
    const spacelessClassName = unit.className.replace(' ', '');
    const className = spacelessClassName.startsWith('Calculator') ? 'Calculator' : spacelessClassName;
    const classes = getClasses();
    const classData = classes[className];
    const classGender = classData?.[unit.gender as Gender];

    const unitItems: Item[] = unit.equipment
      .map((e) => getItem(e.name))
      .filter((i): i is Item => i !== undefined);

    const baseStats = classGender?.baseStats ?? {
      hp: 0, mp: 0, move: 0, jump: 0, speed: 0, pa: 0, ma: 0, cEvPercent: 0
    };

    const stats = totalStatsForClassAndEquipment(baseStats, unitItems, unit.moveSkill);

    return {
      name: unit.name,
      gender: unit.gender,
      zodiac: unit.zodiac,
      brave: unit.brave,
      faith: unit.faith,
      className: unit.className,
      subSkill: unit.subSkill,
      reactSkill: unit.reactSkill,
      supportSkill: unit.supportSkill,
      moveSkill: unit.moveSkill,
      order: unit.order,
      abilities: unit.abilities.map((a) => ({ name: a.name, mainOrSub: a.mainOrSub })),
      equipment: unit.equipment.map((e) => ({ name: e.name })),
      stats,
    };
  };

  return {
    match: {
      team1: {
        name: team1,
        units: team1Record?.units.map(unitFormatter) ?? [],
      },
      team2: {
        name: team2,
        units: team2Record?.units.map(unitFormatter) ?? [],
      },
      matchNumber: matchNumberForMatchup(team1, team2),
    },
    tournament: {
      tournamentId,
      maps: maps.map(({ number, title, order }) => ({ number, title, order })),
    },
  };
}
