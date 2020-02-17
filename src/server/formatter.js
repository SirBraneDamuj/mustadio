const classes = require('../data/classes');
const abilities = require('../data/abilities');
const items = require('../data/items');
const statuses = require('../data/statuses');
const pick = require('lodash/pick');
const pickBy = require('lodash/pickBy');
const omit = require('lodash/omit');

const isAnEmptyArray = (it) => Array.isArray(it) && it.length === 0;

class ApiFormatter {
    constructor(showInfo, showStats) {
        this.showInfo = showInfo;
        this.showStats = showStats;
    }

    formatTournament(tournament) {
        const tournamentId = tournament.id;
        return {
            id: tournamentId,
            teams: tournament.teams.map((team) => this.formatTeamForApiResponse(tournamentId, team)),
        };
    }

    formatClassGenderForApiResponse(clazz) {
        if (this.showStats) {
            const innates = clazz.innates.map((innate) => {
                if (innate === 'Jump') {
                    return null;
                }
                return abilities.getAbility(innate) || statuses.getStatus(innate) || null;
            }).filter((it) => it !== null);
            return {
                ...clazz,
                ...{ innates: !isAnEmptyArray(innates) ? innates : undefined },
                ...{ baseStats: this.showStats ? clazz.baseStats : undefined },
                ...{ raw: this.showInfo ? clazz.raw : undefined },
            };
        } else {
            return {
                ...omit(clazz, 'innates', 'baseStats'),
                ...{ raw: this.showInfo ? clazz.raw : undefined },
            };
        }
    }

    formatUnitClassForApiResponse(className, gender) {
        const realClassName = (className.includes('Calculator') ? 'Calculator' : className).replace(' ', '');
        const clazz = classes.getClass(realClassName, gender);
        return this.formatClassGenderForApiResponse(clazz);
    }

    formatUnitActiveAbilityForApiResponse(abilityName, learned) {
        return {
            name: abilityName,
            learned: learned.map((learnedAbility) => {
                const ability = abilities.getAbility(learnedAbility.name);
                return {
                    name: learnedAbility.name,
                    ...(this.showInfo && ability && { info: ability.info }),
                }
            }),
        };
    }

    formatAbilityForApiResponse(ability) {
        return {
            name: ability.name,
            ...(this.showInfo && ability && { info: ability.info, type: ability.type, }),
        };
    }

    formatUnitNonActiveAbilityForApiResponse(abilityName) {
        const ability = abilities.getAbility(abilityName) || { name: abilityName, info: '' };
        return this.formatAbilityForApiResponse(ability);
    }

    formatUnitAbilitiesForApiResponse(unit) {
        return {
            mainActive: this.formatUnitActiveAbilityForApiResponse(abilities.mainActiveForClass(unit.class), unit.UnitAbilities.filter((unitAbility) => unitAbility.mainOrSub === 'main')),
            subActive: this.formatUnitActiveAbilityForApiResponse(unit.subSkill, unit.UnitAbilities.filter((unitAbility) => unitAbility.mainOrSub === 'sub')),
            react: this.formatUnitNonActiveAbilityForApiResponse(unit.reactSkill),
            support: this.formatUnitNonActiveAbilityForApiResponse(unit.supportSkill),
            move: this.formatUnitNonActiveAbilityForApiResponse(unit.moveSkill),
        };
    }

    formatItemForApiResponse(item) {
        const initialStatuses = item.stats.initialStatuses.map((status) => statuses.getStatus(status));
        const permStatuses = item.stats.permStatuses.map((status) => statuses.getStatus(status));
        if (this.showStats) {
            const stats = {
                ...pickBy(item.stats, (stat) => stat !== 0 && !isAnEmptyArray(stat)),
            };
            if (!isAnEmptyArray(initialStatuses)) {
                stats.initialStatuses = initialStatuses;
            }
            if (!isAnEmptyArray(permStatuses)) {
                stats.permStatuses = permStatuses;
            }
            return {
                ...item,
                stats,
                ...({ info: this.showInfo ? item.info : undefined }),
                ...({ type: this.showInfo ? item.type : undefined }),
                ...({ slot: this.showInfo ? item.slot : undefined }),
            };
        } else {
            return {
                ...item,
                stats: undefined,
                ...({ info: this.showInfo ? item.info : undefined }),
                ...({ type: this.showInfo ? item.type : undefined }),
                ...({ slot: this.showInfo ? item.slot : undefined }),
            };
        }
    }

    formatUnitEquipmentForApiResponse(equipments) {
        return equipments.map((equipment) => {
            const item = items.getItem(equipment.name)
            return this.formatItemForApiResponse(item);
        });
    }

    formatUnitForApiResponse(tournamentId, teamName, unit) {
        return {
            ...pick(unit, 'name', 'gender', 'brave', 'zodiac', 'brave', 'faith'),
            tournamentId,
            teamName,
            class: this.formatUnitClassForApiResponse(unit.class, unit.gender),
            abilties: unit.gender === 'Monster' ? {} : this.formatUnitAbilitiesForApiResponse(unit),
            equipment: unit.gender === 'Monster' ? [] : this.formatUnitEquipmentForApiResponse(unit.UnitEquipments),
        };
    }

    formatTeamForApiResponse(tournamentId, team) {
        return {
            tournamentId,
            teamName: team.name,
            units: team.Units.map((unit) => this.formatUnitForApiResponse(tournamentId, team.name, unit)),
        };
    }

}

module.exports = ApiFormatter;