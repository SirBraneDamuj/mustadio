const listener = require('./twitch');
const server = require('./server');

server.start();

if (process.env['MUSTADIO_CLI'] === 'true') {
    const prompt = require('./prompt');
    listener.start({
        connectHandler: () => { prompt.prompt(); }
    });
} else {
    listener.start({
        connectHandler: () => { console.log('Twitch listener started'); }
    })
}
