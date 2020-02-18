const pick = require('lodash/pick');
const indexLoader = require('./index-loader');
const { TEAM_NAMES } = require('./constants');
const teamLoader = require('./team-loader');
const mapsLoader = require('./maps-loader');
const { Tournament, TournamentMap, Team, Unit, UnitAbility, UnitEquipment } = require('../models');
const client = require('../client/fftbg');
const items = require('./items');
const abilities = require('./abilities');
const statuses = require('./statuses');
const classes = require('./classes');
const monsterSkills = require('./monster-skills');

const createRecordsForTournament = async (tournamentLabel, maps, teamData) => {
    const tournament = await Tournament.create({
        label: tournamentLabel,
    });
    await Promise.all(
        maps.map((tournamentMap) => tournament.createTournamentMap(tournamentMap)),
    );
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

const loaderForFileName = (filename) => {
    switch (filename) {
        case 'infoitem.txt':
            return items;
        case 'infoability.txt':
            return abilities;
        case 'classhelp.txt':
            return classes;
        case 'infostatus.txt':
            return statuses;
        case 'Monsters.txt':
            return monsterSkills;
        case 'MonsterSkills.txt':
            return monsterSkills;
        default:
            return null;
    }
}

const getCurrentTournamentId = async () => {
    const { data } = await client.tournamentList();
    const { dumpFiles, latestTournament } = indexLoader.load(data);
    await Promise.all(
        dumpFiles.map(async ({ name, timestamp }) => {
            const loader = loaderForFileName(name);
            if (loader) {
                return loader.reload(timestamp);
            }
            return Promise.resolve();
        }),
    );
    return latestTournament;
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
    const maps = await mapsLoader.getMaps(label);
    return createRecordsForTournament(label, maps, teamUnits);
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
    await loadTournamentById(tournamentId);
    return Promise.all([
        this.getTeamForTeamName(tournamentId, team1),
        this.getTeamForTeamName(tournamentId, team2),
    ]);
};

module.exports.getMapsForTournament = async (tournamentId) => {
    await loadTournamentById(tournamentId);
    return TournamentMap.findAll({
        include: [{
            model: Tournament,
            attributes: [],
            where: {
                label: tournamentId
            },
        }],
    });
}

module.exports.getFullTournament = async (tournamentId) => {
    await loadTournamentById(tournamentId);
    const teams = await Promise.all(TEAM_NAMES.map(async (teamName) => this.getTeamForTeamName(tournamentId, teamName)))
    return {
        id: tournamentId,
        teams,
    };
}
