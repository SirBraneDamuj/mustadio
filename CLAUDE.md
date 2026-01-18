# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mustadio is an unofficial companion web app for [FFT Battleground](https://twitch.tv/fftbattleground), a Twitch channel running AI tournaments of modded Final Fantasy Tactics. The app displays tournament data, team compositions, and unit statistics to help viewers make informed bets.

## Commands

```bash
npm start              # Start main server (port 3000)
npm run start:loader   # Start background data loader service
npm test               # Run Mocha tests (test/ directory)
npm run build          # Full build: tests + eslint + build client
npm run start:debug    # Start with Node inspector
```

To run a single test file:
```bash
npx mocha test/data/items-test.js
```

## Architecture

**Two-tier application** with Express backend and React frontend:

```
Backend (Node.js/Express)
├── src/main.js           # Entry point - loads models, loader, server
├── src/server/           # Express app, API routes, response formatting
├── src/loader/           # Background service polling for tournament data (10s cadence)
├── src/data/             # Static game data loaders (items, abilities, classes, etc.)
├── src/client/fftbg/     # HTTP client for FFT Battleground dump server
└── src/models/           # Sequelize models (Tournament, Team, Unit, etc.)

Frontend (React 16)
├── client/src/components/app/      # App shell and React Router
├── client/src/components/match/    # Match display with Three.js map rendering
├── client/src/components/unit/     # Unit stats and abilities display
└── client/src/api/mustadio-client.js  # Axios API client
```

## Key Patterns

- **Data Strategy**: `FFTBG_DATA_STRATEGY=real` uses live data; default uses fake test data from `/resources/fftbg_fake`
- **Database Strategy**: `DB_DATA_STRATEGY=real` uses PostgreSQL; default uses in-memory fallback
- **ApiFormatter** (`src/server/formatter.js`): Normalizes API responses with optional `?include=info,stats` query params
- **FftbgContext**: React Context for sharing match/tournament data across components

## API Endpoints

- `GET /api/match` - Current/latest match
- `GET /api/tournaments/:id` - Full tournament data
- `GET /api/tournaments/:id/teams/:teamName` - Specific team
- `GET /api/match/:tournamentId/:team1/:team2` - Match comparison
- `GET /api/swagger` - API documentation

## Environment Variables

- `FFTBG_BASE_URL` - FFT Battleground dump server URL (required for real data)
- `FFTBG_DATA_STRATEGY` - Set to `real` for live data
- `DATABASE_URL` - PostgreSQL connection string
- `DB_DATA_STRATEGY` - Set to `real` for PostgreSQL
- `PORT` - Server port (default 3000)

## Testing

Tests use Mocha + Chai. Test files are in `/test/data/` and cover game data parsing (items, abilities, classes, stats, matchups, team loading).
