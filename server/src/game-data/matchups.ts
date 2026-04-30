import { MATCHUPS } from './constants.js';
import type { TeamName } from '../types/game-data.js';

const DEFAULT: [TeamName, TeamName] = ['red', 'blue'];

function countBy(arr: string[]): Record<string, number> {
  return arr.reduce(
    (acc, item) => {
      acc[item] = (acc[item] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}

export function getLatestMatchForTournament(winners: string[]): [string, string] {
  const latestMatchNum = winners.length;

  if (latestMatchNum === 8) {
    return ['champion', 'champion'];
  }

  if (latestMatchNum < 4) {
    const match = MATCHUPS[latestMatchNum];
    return match?.[0] ?? DEFAULT;
  }

  const winFrequencies = countBy(winners);

  if (latestMatchNum < 6) {
    const match = MATCHUPS[latestMatchNum]?.find(([team1, team2]) => {
      return (winFrequencies[team1] ?? 0) > 0 && (winFrequencies[team2] ?? 0) > 0;
    });
    return match ?? DEFAULT;
  }

  if (latestMatchNum === 6) {
    const match = MATCHUPS[latestMatchNum]?.find(([team1, team2]) => {
      return (winFrequencies[team1] ?? 0) > 1 && (winFrequencies[team2] ?? 0) > 1;
    });
    return match ?? DEFAULT;
  }

  if (latestMatchNum === 7) {
    const match = MATCHUPS[7]?.find(([team1]) => {
      return (winFrequencies[team1] ?? 0) > 2;
    });
    return match ?? DEFAULT;
  }

  return DEFAULT;
}
