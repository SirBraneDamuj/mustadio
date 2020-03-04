const config = require('../config');
require('../models');
const winners = require('./winners');
winners.monitorWinners();
const tournaments = require('./tournaments');
tournaments.monitorTournaments();

if (config.PRUNE_DATABASE === 'true') {
    const prune = require('./prune');
    prune.pruneData();
}