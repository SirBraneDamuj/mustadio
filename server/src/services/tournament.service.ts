import { prisma } from '../db.js';
import { TEAM_NAMES } from '../game-data/constants.js';
import { getLatestMatchForTournament } from '../game-data/matchups.js';
import type { TeamName } from '../types/game-data.js';

export async function getLatestTournamentId(): Promise<string | null> {
  const result = await prisma.tournament.findFirst({
    orderBy: { label: 'desc' },
    select: { label: true },
  });
  return result?.label ?? null;
}

export async function getTeamForTeamName(tournamentId: string, teamName: string) {
  return prisma.team.findFirst({
    where: {
      name: teamName,
      tournament: { label: tournamentId },
    },
    include: {
      units: {
        orderBy: { createdAt: 'asc' },
        include: {
          abilities: true,
          equipment: {
            orderBy: { createdAt: 'asc' },
          },
        },
      },
    },
  });
}

export async function getTeamsForTournament(
  tournamentId: string,
  team1: string,
  team2: string
) {
  return Promise.all([
    getTeamForTeamName(tournamentId, team1),
    getTeamForTeamName(tournamentId, team2),
  ]);
}

export async function getMapsForTournament(tournamentId: string) {
  return prisma.tournamentMap.findMany({
    where: {
      tournament: { label: tournamentId },
    },
    orderBy: { order: 'asc' },
  });
}

export async function getLatestMatchForTournamentId(
  tournamentId: string
): Promise<[string, string]> {
  const tournament = await prisma.tournament.findFirst({
    where: { label: tournamentId },
    include: {
      winners: {
        orderBy: { matchNum: 'asc' },
      },
    },
  });

  const tournamentWinners = tournament?.winners.map((w) => w.name) ?? [];
  return getLatestMatchForTournament(tournamentWinners);
}

export async function getFullTournament(tournamentId: string) {
  const teams = await Promise.all(
    TEAM_NAMES.map((teamName: TeamName) => getTeamForTeamName(tournamentId, teamName))
  );
  return {
    id: tournamentId,
    teams: teams.filter((t) => t !== null),
  };
}

export async function findTournamentByLabel(label: string) {
  return prisma.tournament.findFirst({
    where: { label },
    include: { winners: true },
  });
}

export async function createTournament(label: string) {
  return prisma.tournament.create({
    data: { label },
  });
}
