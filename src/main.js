require('./models');

const dumps = require('./loader/dumps');
dumps.monitorDumps();

const server = require('./server');
server.start();