const tmi = require("tmi.js");
const fs = require("fs");
 
const opts = {
  identity: {
    username: process.env['TWITCH_USERNAME'],
    password: process.env['TWITCH_AUTH_TOKEN']
  },
  channels: [
    "FFTBattleground"
  ]
};

const teamRegex = /(\w*) Team: /;
const championRegex = /^Champion Team/;
const unitRegex = /^(.* - )+(.*)$/;

const skipStrings = [
  "you advanced to Level",
  "The current track is",
  "your bet is",
  "your balance is",
  "The current Skill Drop is",
  "Class list:",
  "you successfully bought",
  "your skills: ",
  "Longest snubs:",
  "the !skill command is used to look up",
  "Betting is closed:",
];

const onMessageHandler = ({ unitHandler, teamHandler, tournamentHandler, matchHandler, msgCallback }) => (channel, userstate, msg, self) => {
    if (self) { return; }
    if (skipStrings.some(s => msg.includes(s))) { return; }

    if (userstate.username === 'fftbattleground') {
        msgCallback(msg);
    }
};

const onConnectedHandler = ({ connectHandler }) => (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
    connectHandler();
};
const writeStream = fs.createWriteStream("log.txt", { flags: "a" });
const client = new tmi.client(opts);
    
module.exports = {
    start(callbacks) {
        client.on('message', onMessageHandler({
            ...callbacks,
            msgCallback: (msg) => { writeStream.write(msg + '\n'); },
        }));
        client.on('connected', onConnectedHandler(callbacks));
        client.connect();
    },
    say(msg) {
        console.log(`${process.env['TWITCH_USERNAME']} says: ${msg}`)
        client.say('FFTBattleground', msg);
    },
};