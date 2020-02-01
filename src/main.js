const listener = require('./twitch');
const prompt = require('./prompt');
const server = require('./server');

server.start();

if (process.env['MUSTADIO_CLI'] === 'true') {
    listener.start({
        connectHandler: () => { prompt.prompt(); }
    });
} else {
    listener.start({
        connectHandler: () => { console.log('Twitch listener started'); }
    })
}
