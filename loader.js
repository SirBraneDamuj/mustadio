const twitch = require('./twitch');

const sendTeamMessage = (teamName) => {
    twitch.say(`!team ${teamName}`);
};

const sendUnitMessage = (teamName, unitNumber) => {
    twitch.say(`!${teamName} ${unitNumber}`);
};

module.exports = {
    loadTeam(teamName) {
        sendTeamMessage(teamName);
        const promises = [1, 2, 3, 4].map((x) => 
            new Promise((resolve) => {
                setTimeout(() => {
                    sendUnitMessage(teamName, x);
                    resolve();
                }, x * 4000);
            })
        );
        return Promise.all(promises);
    },
};