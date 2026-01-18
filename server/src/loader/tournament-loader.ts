import { prisma } from '../db.js';
import { fftbgClient } from '../clients/fftbg/index.js';
import { parseIndex } from './index-parser.js';
import { parseTeam } from './team-parser.js';
import { getMaps } from './maps-parser.js';
import { TEAM_NAMES } from '../game-data/constants.js';
import type { ParsedUnit, ParsedMap, TeamName } from '../types/game-data.js';

const CADENCE = 10 * 1000;

async function getCurrentTournamentId(): Promise<string> {
  const { data } = await fftbgClient.tournamentList();
  const { latestTournament } = parseIndex(data);
  return latestTournament;
}

function loadTeamFromStringOrDieTrying(data: string, teamName: string): ParsedUnit[] {
  try {
    return parseTeam(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to load ${teamName}: ${message}`);
  }
}

async function createRecordsForTournament(
  tournamentLabel: string,
  maps: ParsedMap[],
  teamData: Record<TeamName, ParsedUnit[]>
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const tournament = await tx.tournament.create({
      data: { label: tournamentLabel },
    });

    // Create maps
    for (const [index, map] of maps.entries()) {
      await tx.tournamentMap.create({
        data: {
          tournamentId: tournament.id,
          number: map.number,
          title: map.title,
          order: index,
        },
      });
    }

    // Create teams and units
    for (const teamName of TEAM_NAMES) {
      const team = await tx.team.create({
        data: {
          tournamentId: tournament.id,
          name: teamName,
        },
      });

      const units = teamData[teamName];
      if (!units) continue;

      for (const [index, unit] of units.entries()) {
        const unitRecord = await tx.unit.create({
          data: {
            teamId: team.id,
            name: unit.name,
            gender: unit.gender,
            zodiac: unit.zodiac,
            brave: unit.brave,
            faith: unit.faith,
            className: unit.class,
            subSkill: unit.subSkill || null,
            reactSkill: unit.reactSkill || null,
            supportSkill: unit.supportSkill || null,
            moveSkill: unit.moveSkill || null,
            order: index,
          },
        });

        // Create abilities
        for (const name of unit.mainAbilities) {
          await tx.unitAbility.create({
            data: {
              unitId: unitRecord.id,
              name,
              mainOrSub: 'main',
            },
          });
        }
        for (const name of unit.subAbilities) {
          await tx.unitAbility.create({
            data: {
              unitId: unitRecord.id,
              name,
              mainOrSub: 'sub',
            },
          });
        }

        // Create equipment
        for (const name of unit.gear) {
          await tx.unitEquipment.create({
            data: {
              unitId: unitRecord.id,
              name,
              slot: 'unknown', // Slot will be determined by formatter using item data
            },
          });
        }
      }
    }
  });
}

export async function loadTournamentById(tournamentId: string): Promise<void> {
  const label = tournamentId;
  const existing = await prisma.tournament.findFirst({
    where: { label },
    include: { winners: true },
  });

  if (existing) {
    return;
  }

  const teamUnits: Partial<Record<TeamName, ParsedUnit[]>> = {};

  for (const teamName of TEAM_NAMES) {
    const { data } = await fftbgClient.tournamentTeam(label, teamName);
    const units = loadTeamFromStringOrDieTrying(data, teamName);
    teamUnits[teamName] = units;
  }

  const maps = await getMaps(label);
  await createRecordsForTournament(label, maps, teamUnits as Record<TeamName, ParsedUnit[]>);
}

export async function loadCurrentTournament(): Promise<void> {
  const latest = await getCurrentTournamentId();
  console.log(`THE LOADER WANTS TO LOAD: ${latest}`);

  const tournament = await prisma.tournament.findFirst({
    where: { label: latest },
  });

  if (!tournament) {
    console.log(`TOURNAMENT ${latest} NOT FOUND. LOADING FROM DUMP!`);
    await loadTournamentById(latest);
  } else {
    console.log(`TOURNAMENT ${latest} FOUND.`);
  }
}

async function monitor(): Promise<void> {
  try {
    await loadCurrentTournament();
  } catch (err) {
    console.error(`Encountered error loading tournament!`, err);
  }
  setTimeout(monitor, CADENCE);
}

export function monitorTournaments(): void {
  setTimeout(monitor, CADENCE);
}
