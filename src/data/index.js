const { TEAM_NAMES } = require('./constants');
const teamLoader = require('./team_loader');
const strategy = process.env.DATA_STRATEGY === 'real' ? require('./real') : require('./fake');

let currentTournamentId = '';
let teams = {};

const loadCurrentTournament = async () => {
    const tournamentId = await strategy.getCurrentTournamentId();
    console.log(`fetching tournament ID ${tournamentId}`);
    for (const teamName of TEAM_NAMES) {
        const data = await strategy.getTeamData(tournamentId, teamName);
        const units = loadTeamFromStringOrDieTrying(data, teamName);
        teams[teamName] = units;
        console.log(`Loaded ${teams[teamName].length} units for ${teamName} team`);
    }
    currentTournamentId = tournamentId;
};

const loadTeamFromStringOrDieTrying = (data, teamName) => {
    try {
        return teamLoader.loadTeamFromString(data);
    } catch (error) {
        throw new Error(`Failed to load ${teamName}: ${error.message}`)
    }
};

module.exports.ready = async () => {
    if (!TEAM_NAMES.every((teamName) => teamName in teams)) {
        await this.reinitialize();
    }
};

module.exports.reinitialize = async () => {
    teams = {};
    await loadCurrentTournament();
}

module.exports.getCurrentTournamentId = () => {
    return currentTournamentId;
}

module.exports.unitsForTeam = (teamName) => {
    return teams[teamName];
}
