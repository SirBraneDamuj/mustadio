import { prisma } from '../db.js';
import { fftbgClient } from '../clients/fftbg/index.js';

const CADENCE = 1000 * 10;
const MIN_TOURNAMENT_LABEL = 'tournament_1580493563486'; // First tournament with winners file

function parseWinners(winnersData: string): string[] {
  if (winnersData === '') {
    return [];
  }
  let delimiter = '\r\n';
  if (!winnersData.includes(delimiter)) {
    delimiter = '\n';
  }
  return winnersData.split(delimiter).filter((s) => s !== '');
}

async function loadTournamentWinners(tournament: { id: number; label: string }): Promise<void> {
  const { data } = await fftbgClient.tournamentWinners(tournament.label);
  const winners = parseWinners(data);

  for (const [index, winner] of winners.entries()) {
    await prisma.tournamentWinner.upsert({
      where: {
        tournamentId_matchNum: {
          tournamentId: tournament.id,
          matchNum: index,
        },
      },
      create: {
        tournamentId: tournament.id,
        name: winner,
        matchNum: index,
      },
      update: {
        name: winner,
      },
    });
  }
}

async function checkWinners(): Promise<void> {
  try {
    // Find tournaments with fewer than 8 winners (incomplete tournaments)
    const tournaments = await prisma.tournament.findMany({
      where: {
        label: { gte: MIN_TOURNAMENT_LABEL },
      },
      include: {
        _count: {
          select: { winners: true },
        },
      },
    });

    const unfinishedTournaments = tournaments.filter((t) => t._count.winners < 8);

    for (const tournament of unfinishedTournaments) {
      await loadTournamentWinners(tournament);
    }
  } catch (err) {
    console.error('Error checking winners:', err);
  }
}

export async function loadWinnersForTournament(label: string): Promise<void> {
  const tournament = await prisma.tournament.findFirst({
    where: { label },
  });

  if (tournament) {
    await loadTournamentWinners(tournament);
  }
}

export function monitorWinners(): void {
  const loop = async () => {
    await checkWinners();
    setTimeout(loop, CADENCE);
  };
  setTimeout(loop, CADENCE);
}
