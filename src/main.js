const server = require('./server');
require('./models');
const winners = require('./data/winners');
winners.monitorWinners();

server.start();