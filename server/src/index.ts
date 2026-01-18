import { serve } from '@hono/node-server';
import { config } from './config.js';
import { createApp } from './api/index.js';
import { reloadAllGameData } from './game-data/index.js';

async function main(): Promise<void> {
  console.log('Starting Mustadio server...');

  // Load game data
  console.log('Loading game data...');
  await reloadAllGameData('initial');
  console.log('Game data loaded.');

  // Create app
  const app = createApp();

  // Start server
  const port = config.PORT;
  console.log(`Server starting on port ${port}...`);

  serve({
    fetch: app.fetch,
    port,
  });

  console.log(`Server running at http://localhost:${port}`);
  console.log(`API available at http://localhost:${port}/api`);
  console.log(`Swagger UI at http://localhost:${port}/api/swagger`);
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
