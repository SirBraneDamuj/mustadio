import { Hono } from 'hono';
import { ApiFormatter } from '../formatter.js';
import {
  getLatestTournamentId,
  getLatestMatchForTournamentId,
  getTeamsForTournament,
  getMapsForTournament,
} from '../../services/tournament.service.js';
import { getItem } from '../../game-data/items.js';
import { getClasses } from '../../game-data/classes.js';
import { totalStatsForClassAndEquipment } from '../../game-data/stats.js';
import { matchNumberForMatchup } from '../../game-data/constants.js';
import type { Item, Gender } from '../../types/game-data.js';

const matchRoutes = new Hono();

matchRoutes.get('/', async (c) => {
  const tournamentId = await getLatestTournamentId();

  if (!tournamentId) {
    return c.json({ error: 'No tournament found' }, 404);
  }

  const [team1, team2] = await getLatestMatchForTournamentId(tournamentId);

  return c.json({
    tournamentId,
    team1,
    team2,
  });
});

matchRoutes.get('/:tournamentId/:team1/:team2', async (c) => {
  const { tournamentId, team1, team2 } = c.req.param();

  const maps = await getMapsForTournament(tournamentId);
  const [team1Record, team2Record] = await getTeamsForTournament(tournamentId, team1, team2);

  const formatter = new ApiFormatter(false, false);
  const classes = getClasses();

  const unitFormatter = (teamName: string) => (unit: NonNullable<typeof team1Record>['units'][number]) => {
    const spacelessClassName = unit.className.replace(' ', '');
    const className = spacelessClassName.startsWith('Calculator') ? 'Calculator' : spacelessClassName;
    const classData = classes[className];
    const classGender = classData?.[unit.gender as Gender];

    const unitItems: Item[] = unit.equipment
      .map((e) => getItem(e.name))
      .filter((i): i is Item => i !== undefined);

    const baseStats = classGender?.baseStats ?? {
      hp: 0, mp: 0, move: 0, jump: 0, speed: 0, pa: 0, ma: 0, cEvPercent: 0
    };

    const stats = totalStatsForClassAndEquipment(baseStats, unitItems, unit.moveSkill);

    // Format unit for API response
    const formattedUnit = {
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
      abilities: unit.abilities.map((a) => ({ name: a.name, mainOrSub: a.mainOrSub })),
      equipment: unit.equipment.map((e) => ({ name: e.name })),
    };

    return {
      ...formatter.formatUnitForApiResponse(tournamentId, teamName, formattedUnit),
      stats,
    };
  };

  return c.json({
    match: {
      team1: {
        name: team1,
        units: team1Record?.units.map(unitFormatter(team1)) ?? [],
      },
      team2: {
        name: team2,
        units: team2Record?.units.map(unitFormatter(team2)) ?? [],
      },
      matchNumber: matchNumberForMatchup(team1, team2),
    },
    tournament: {
      tournamentId,
      maps: maps.map(({ number, title, order }) => ({ number, title, order })),
    },
  });
});

export { matchRoutes };
