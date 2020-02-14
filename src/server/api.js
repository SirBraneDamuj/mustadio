const express = require('express');
const data = require('../data');
const classes = require('../data/classes');
const abilities = require('../data/abilities');
const items = require('../data/items');
const statuses = require('../data/statuses');
const pick = require('lodash/pick');
const pickBy = require('lodash/pickBy');
const omit = require('lodash/omit');

const router = express.Router();

const formatUnitClassForApiResponse = (className, gender) => {
    const realClassName = (className.includes('Calculator') ? 'Calculator' : className).replace(' ', '');
    const clazz = classes.getClass(realClassName, gender);
    const innates = clazz.innates.map((innate) => {
        if (innate === 'Jump') {
            return null;
        }
        return abilities.getAbility(innate) || statuses.getStatus(innate) || null;
    }).filter((it) => it !== null);
    const ret = {
        ...omit(clazz, 'innates'),
    };
    if (!isAnEmptyArray(innates)) {
        ret.innates = innates;
    }
    return ret;
};

const formatUnitActiveAbilityForApiResponse = (abilityName, learned) => ({
    name: abilityName,
    learned: learned.map((learnedAbility) => ({
        name: learnedAbility.name,
        info: abilities.getAbility(learnedAbility.name) && abilities.getAbility(learnedAbility.name).info,
    })),
});

const formatUnitNonActiveAbilityForApiResponse = (abilityName) => ({
    name: abilityName,
    info: abilities.getAbility(abilityName) && abilities.getAbility(abilityName).info,
});

const formatUnitAbilitiesForApiResponse = (unit) => ({
    mainActive: formatUnitActiveAbilityForApiResponse(abilities.mainActiveForClass(unit.class), unit.UnitAbilities.filter((unitAbility) => unitAbility.mainOrSub === 'main')),
    subActive: formatUnitActiveAbilityForApiResponse(unit.subSkill, unit.UnitAbilities.filter((unitAbility) => unitAbility.mainOrSub === 'sub')),
    react: formatUnitNonActiveAbilityForApiResponse(unit.reactSkill),
    support: formatUnitNonActiveAbilityForApiResponse(unit.supportSkill),
    move: formatUnitNonActiveAbilityForApiResponse(unit.moveSkill),
});

const isAnEmptyArray = (it) => Array.isArray(it) && it.length === 0;

const formatUnitEquipmentForApiResponse = (equipments) => {
    return equipments.map((equipment) => {
        const item = items.getItem(equipment.name)
        const initialStatuses = item.stats.initialStatuses.map((status) => statuses.getStatus(status));
        const permStatuses = item.stats.permStatuses.map((status) => statuses.getStatus(status));
        const stats = {
            ...pickBy(item.stats, (stat) => stat !== 0 && !isAnEmptyArray(stat)),
        };
        if (!isAnEmptyArray(initialStatuses)) {
            stats.initialStatuses = initialStatuses;
        }
        if (!isAnEmptyArray(permStatuses)) {
            stats.permStatuses = permStatuses;
        }
        const res = {
            ...item,
            stats,
        };
        return res;
    });
};

const formatUnitForApiResponse = (tournamentId, teamName, unit) => ({
    ...pick(unit, 'name', 'gender', 'brave', 'zodiac', 'brave', 'faith'),
    tournamentId,
    teamName,
    class: formatUnitClassForApiResponse(unit.class, unit.gender),
    abilties: unit.gender === 'Monster' ? {} : formatUnitAbilitiesForApiResponse(unit),
    equipment: unit.gender === 'Monster' ? [] : formatUnitEquipmentForApiResponse(unit.UnitEquipments),
});

const formatTeamForApiResponse = (tournamentId, team) => ({
    tournamentId,
    teamName: team.name,
    units: team.Units.map((unit) => formatUnitForApiResponse(tournamentId, team.name, unit)),
});

router.get('/tournaments/:tournamentId', async (req, res) => {
    const tournamentId = req.params.tournamentId === 'latest' ? await data.getLatestTournamentId() : req.params.tournamentId;
    const result = await data.getFullTournament(tournamentId);
    res.json({
        id: tournamentId,
        teams: result.teams.map((team) => formatTeamForApiResponse(tournamentId, team)),
    });
});

module.exports = router;