const listener = require('./twitch');
const prompt = require('./prompt');
const data = require('./data');
const server = require('./server');

server.start();

listener.start({
    connectHandler: () => { prompt.prompt(); }
});

