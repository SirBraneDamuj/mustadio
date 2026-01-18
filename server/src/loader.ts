import { reloadAllGameData } from './game-data/index.js';
import { monitorTournaments } from './loader/tournament-loader.js';
import { monitorWinners } from './loader/winners-loader.js';

async function main(): Promise<void> {
  console.log('Starting Mustadio loader service...');

  // Load game data
  console.log('Loading game data...');
  await reloadAllGameData('initial');
  console.log('Game data loaded.');

  // Start tournament monitoring
  console.log('Starting tournament monitoring...');
  monitorTournaments();

  // Start winners monitoring
  console.log('Starting winners monitoring...');
  monitorWinners();

  console.log('Loader service running.');
}

main().catch((err) => {
  console.error('Failed to start loader service:', err);
  process.exit(1);
});
