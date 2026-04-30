import { Hono } from 'hono';
import { createFormatter } from '../formatter.js';
import {
  getLatestTournamentId,
  getFullTournament,
  getTeamForTeamName,
} from '../../services/tournament.service.js';

const tournamentRoutes = new Hono();

tournamentRoutes.get('/:tournamentId', async (c) => {
  const tournamentIdParam = c.req.param('tournamentId');
  const tournamentId =
    tournamentIdParam === 'latest'
      ? await getLatestTournamentId()
      : tournamentIdParam;

  if (!tournamentId) {
    return c.json({ error: 'No tournament found' }, 404);
  }

  const result = await getFullTournament(tournamentId);
  const formatter = createFormatter(c.req.query());

  // Convert Prisma result to format expected by formatter
  const formattedResult = {
    id: result.id,
    teams: result.teams.map((team) => {
      if (!team) return null;
      return {
        name: team.name,
        units: team.units.map((unit) => ({
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
        })),
      };
    }),
  };

  return c.json(formatter.formatTournament(formattedResult));
});

tournamentRoutes.get('/:tournamentId/teams/:teamName', async (c) => {
  const tournamentIdParam = c.req.param('tournamentId');
  const teamName = c.req.param('teamName');

  const tournamentId =
    tournamentIdParam === 'latest'
      ? await getLatestTournamentId()
      : tournamentIdParam;

  if (!tournamentId) {
    return c.json({ error: 'No tournament found' }, 404);
  }

  const result = await getTeamForTeamName(tournamentId, teamName);

  if (!result) {
    return c.json({ error: 'Team not found' }, 404);
  }

  const formatter = createFormatter(c.req.query());

  // Convert Prisma result to format expected by formatter
  const formattedTeam = {
    name: result.name,
    units: result.units.map((unit) => ({
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
    })),
  };

  return c.json(formatter.formatTeamForApiResponse(tournamentId, formattedTeam));
});

export { tournamentRoutes };
