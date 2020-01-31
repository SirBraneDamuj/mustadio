const fs = require('fs');
const axios = require('axios');
const chunk = require('lodash/chunk');

const client = axios.create({
    baseURL: process.env['FFTBG_BASE_URL'],
    responseType: 'text',
});

const TEAM_NAMES = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'purple', 'brown', 'champion'];
const GENDERS = ['Male', 'Female', 'Monster'];
let teams = {};

// YIKES
const tournamentIdRegex = /tournament_\d{13}/gm;

const getCurrentTournament = async () => {
    const response = await client.get('/');
    const matches = [...response.data.matchAll(tournamentIdRegex)];
    const tournamentId = matches.pop().pop();
    console.log(`fetching tournament ID ${tournamentId}`);
    for (const teamName of TEAM_NAMES) {
        const { data } = await client.get(`/${tournamentId}/${teamName}.txt`);
        loadTeamFromString(teamName, data);
        console.log(`Loaded ${teams[teamName].length} units for ${teamName} team`);
    }
};

const loadTeamFromString = (teamName, teamData) => {
    let delimiter = '\r\n';
    if (teamData.indexOf(delimiter) == -1) {
        delimiter = '\n';
    }
    const tokens = teamData.split(delimiter).slice(3).filter(s => s !== '');
    let index = 0;
    let lastUnitIndex = -1;
    const unitStrings = [];
    while (unitStrings.length < 4 && index < tokens.length) {
        const thisToken = tokens[index];
        if (GENDERS.includes(thisToken)) {
            if (lastUnitIndex != -1) {
                unitStrings.push(tokens.slice(lastUnitIndex, index - 1));
            }
            lastUnitIndex = index - 1;
        }
        index += 1;
    }
    unitStrings.push(tokens.slice(lastUnitIndex));
    if (unitStrings.length != 4) {
        console.log(unitStrings);
        throw new Error(`${teamName} failed to load... found ${unitStrings.length} units`);
    }

    const units = unitStrings
        .map((unitTokens) => {
            const gender = unitTokens[1];
            const monster = gender === 'Monster';
            const mainAbilities = unitTokens[unitTokens.length - 2].split(', ');
            const subAbilities = unitTokens[unitTokens.length - 1].split(', ');
            const gear = unitTokens.slice(10, unitTokens.length - 2);
            return {
                name: unitTokens[0],
                gender: unitTokens[1],
                zodiac: unitTokens[2],
                brave: unitTokens[3],
                faith: unitTokens[4],
                class: unitTokens[5],
                activeSkill: unitTokens[6],
                reactSkill: unitTokens[7],
                supportSkill: unitTokens[8],
                moveSkill: unitTokens[9],
                mainAbilities: !monster ? mainAbilities : [],
                subAbilities: !monster ? subAbilities : [],
                gear,
                raw: unitTokens.join(" - "),
            };
        });
    teams[teamName] = units;
};

module.exports.ready = async () => {
    if (!TEAM_NAMES.every((teamName) => teamName in teams)) {
        await this.reinitialize();
    }
};

module.exports.reinitialize = async () => {
    teams = {};
    await getCurrentTournament();
}

module.exports.unitsForTeam = (teamName) => {
    return teams[teamName];
}

module.exports.TEAM_NAMES = TEAM_NAMES

//Betting is open for red vs blue. Use !bet [amount] [team] to place a wager!
module.exports.startNewMatch = (matchMsg) => {
    state = 'match';
    const tokens = matchMsg.split(' ');
    currentTeam1 = tokens[4];
    currentTeam2 = tokens[6].slice(0, -1);
};

module.exports.currentMatch = () => [currentTeam1, currentTeam2]
module.exports.currentState = () => state;
module.exports.save = () => {
    fs.writeFileSync('teams.json', JSON.stringify(teams));
    fs.writeFileSync('units.json', JSON.stringify(units));
};