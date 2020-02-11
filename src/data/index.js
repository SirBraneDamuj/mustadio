const pick = require('lodash/pick');
const { TEAM_NAMES } = require('./constants');
const teamLoader = require('./team-loader');
const { Op } = require('sequelize');
const { Tournament, Team, Unit, UnitAbility, UnitEquipment } = require('../models');
const client = require('../client/fftbg');

const createRecordsForTournament = async (tournamentLabel, teamData) => {
    const tournament = await Tournament.create({
        label: tournamentLabel,
    });
    for (const teamName of TEAM_NAMES) {
        const team = await tournament.createTeam({
            name: teamName,
        });
        const units = teamData[teamName];
        let index = 0;
        for (const unit of units) {
            const unitRecord = await team.createUnit({
                ...pick(unit, 'name', 'gender', 'zodiac', 'brave', 'faith', 'class', 'subSkill', 'reactSkill', 'supportSkill', 'moveSkill'),
                order: index,
            });
            index += 1;
            for (const name of unit.mainAbilities) {
                await unitRecord.createUnitAbility({
                    name,
                    mainOrSub: 'main',
                });
            }
            for (const name of unit.subAbilities) {
                await unitRecord.createUnitAbility({
                    name,
                    mainOrSub: 'sub',
                });
            }
            for (const name of unit.gear) {
                await unitRecord.createUnitEquipment({ name });
            }
        }
    }
    return tournament;
}

const tournamentIdRegex = /tournament_\d{13}/gm;

const getCurrentTournamentId = async () => {
    const { data } = await client.tournamentList();
    return [...data.matchAll(tournamentIdRegex)].pop().pop();
}

const loadTournamentById = async (tournamentId) => {
    let label = tournamentId;
    if (label === 'latest') {
        label = await getCurrentTournamentId();
    }
    const existing = await Tournament.findOne({
        where: { label },
    });
    if (existing !== null) {
        return existing;
    }
    const teamUnits = {};
    for (const teamName of TEAM_NAMES) {
        const { data } = await client.tournamentTeam(label, teamName);
        const units = loadTeamFromStringOrDieTrying(data, teamName);
        teamUnits[teamName] = units;
    }
    return createRecordsForTournament(label, teamUnits);
};

const loadTeamFromStringOrDieTrying = (data, teamName) => {
    try {
        return teamLoader.loadTeamFromString(data);
    } catch (error) {
        throw new Error(`Failed to load ${teamName}: ${error.message}`)
    }
};

module.exports.getLatestTournamentId = async () => getCurrentTournamentId();

module.exports.getTournamentById = async (tournamentId) => {
    return loadTournamentById(tournamentId);
};

module.exports.getTeamsForTournament = async (tournamentId, team1, team2) => {
    await loadTournamentById(tournamentId);
    const result = await Team.findAll({
        where: {
            [Op.or]: [
                { name: team1 },
                { name: team2 },
            ],
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
    return result;
};