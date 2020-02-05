const tmi = require("tmi.js");
const config = require('../config');
 
const opts = {
  identity: {
    username: config.TWITCH_USERNAME,
    password: config.TWITCH_AUTH_TOKEN,
  },
  channels: [
    "FFTBattleground"
  ]
};

const onConnectedHandler = ({ connectHandler }) => (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
    connectHandler();
};
const client = new tmi.client(opts);
    
module.exports = {
    start(callbacks) {
        client.on('connected', onConnectedHandler(callbacks));
        client.connect();
    },
    say(msg) {
        console.log(`${config.TWITCH_USERNAME} says: ${msg}`)
        // client.say('FFTBattleground', msg);
    },
};