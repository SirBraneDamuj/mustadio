import { prisma } from '../db.js';
import type { ParsedUnit } from '../types/game-data.js';

export async function createTeamWithUnits(
  tournamentId: number,
  teamName: string,
  units: ParsedUnit[]
) {
  return prisma.team.create({
    data: {
      name: teamName,
      tournamentId,
      units: {
        create: units.map((unit, index) => ({
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
          abilities: {
            create: [
              ...unit.mainAbilities.map((name) => ({
                name,
                mainOrSub: 'main',
              })),
              ...unit.subAbilities.map((name) => ({
                name,
                mainOrSub: 'sub',
              })),
            ],
          },
          equipment: {
            create: unit.gear.map((name) => ({
              name,
              slot: 'unknown', // Will be filled in by formatter
            })),
          },
        })),
      },
    },
    include: {
      units: {
        include: {
          abilities: true,
          equipment: true,
        },
      },
    },
  });
}
