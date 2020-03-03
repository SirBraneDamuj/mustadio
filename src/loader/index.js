require('../models');
const winners = require('./winners');
winners.monitorWinners();
const tournaments = require('./tournaments');
tournaments.monitorTournaments();