const listener = require('./twitch');
const prompt = require('./prompt');
const data = require('./data');
const server = require('./server');

server.start();

listener.start({
    unitHandler: data.setUnitForMsg,
    teamHandler: data.setTeamForMsg,
    tournamentHandler: data.reinitialize,
    matchHandler: data.startNewMatch,
    connectHandler: () => { prompt.prompt(); }
});

