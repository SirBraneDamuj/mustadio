const fs = require('fs');

module.exports.getCurrentTournamentId = async () => 'fake';

module.exports.getTeamData = async (_, teamName) => fs.readFileSync(`${__dirname}/../../resources/${teamName}.txt`, 'utf8');