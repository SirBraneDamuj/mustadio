import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serveStatic } from '@hono/node-server/serve-static';
import { swaggerUI } from '@hono/swagger-ui';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

import { dataRoutes } from './routes/data.js';
import { tournamentRoutes } from './routes/tournaments.js';
import { matchRoutes } from './routes/match.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', '..', 'public');

// Load OpenAPI spec
let openApiSpec: object;
try {
  const specPath = join(__dirname, '..', '..', 'resources', 'openapi.yaml');
  const specContent = readFileSync(specPath, 'utf-8');
  openApiSpec = parseYaml(specContent) as object;
} catch {
  openApiSpec = { openapi: '3.0.0', info: { title: 'Mustadio API', version: '1.0.0' } };
}

export function createApp(): Hono {
  const app = new Hono();

  // Middleware
  app.use('*', cors());
  app.use('*', logger());

  // API routes
  const api = new Hono();

  // Swagger UI
  api.get('/swagger', swaggerUI({ url: '/api/openapi.json' }));
  api.get('/openapi.json', (c) => c.json(openApiSpec));

  // Data routes
  api.route('/', dataRoutes);

  // Tournament routes
  api.route('/tournaments', tournamentRoutes);

  // Match routes
  api.route('/match', matchRoutes);

  // Mount API under /api prefix
  app.route('/api', api);

  // Health check
  app.get('/health', (c) => c.json({ status: 'ok' }));

  // Serve static files from public directory (client build)
  app.use('/*', serveStatic({ root: './public' }));

  // Fallback to index.html for client-side routing
  app.get('*', (c) => {
    const indexPath = join(publicDir, 'index.html');
    if (existsSync(indexPath)) {
      const html = readFileSync(indexPath, 'utf-8');
      return c.html(html);
    }
    return c.text('Not Found', 404);
  });

  return app;
}

export type App = ReturnType<typeof createApp>;
