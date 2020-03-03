const { TEAM_NAMES } = require('./constants');
const { Tournament, TournamentMap, Team, Unit, UnitAbility, UnitEquipment } = require('../models');
const matchups = require('./matchups');

module.exports.getLatestTournamentId = async () => Tournament.max('label');

module.exports.getTeamForTeamName = async (tournamentId, teamName) => Team.findOne({
    where: {
        name: teamName,
    },
    include: [{
        model: Unit,
        include: [{
            model: UnitAbility,
        }, {
            model: UnitEquipment,
        }],
    }, {
        model: Tournament,
        attributes: [],
        where: {
            label: tournamentId,
        },
    }],
    order: [
        [Unit, 'createdAt', 'ASC'],
        [Unit, UnitEquipment, 'createdAt', 'ASC']
    ]
});

module.exports.getTeamsForTournament = async (tournamentId, team1, team2) => {
    return Promise.all([
        this.getTeamForTeamName(tournamentId, team1),
        this.getTeamForTeamName(tournamentId, team2),
    ]);
};

module.exports.getMapsForTournament = async (tournamentId) => {
    return TournamentMap.findAll({
        include: [{
            model: Tournament,
            attributes: [],
            where: {
                label: tournamentId
            },
        }],
        order: [
            ['order', 'ASC'],
        ],
    });
};

module.exports.getLatestMatchForTournamentId = async (tournamentId) => {
    const tournament = await Tournament.findOne({
        where: {
            label: tournamentId,
        },
    });
    const tournamentWinners = ((await tournament.getTournamentWinners()) || []).map((winner) => winner.name);
    return matchups.getLatestMatchForTournament(tournamentWinners);
};

module.exports.getFullTournament = async (tournamentId) => {
    const teams = await Promise.all(TEAM_NAMES.map(async (teamName) => this.getTeamForTeamName(tournamentId, teamName)))
    return {
        id: tournamentId,
        teams,
    };
};
