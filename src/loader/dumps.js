const items = require('../data/items');
const abilities = require('../data/abilities');
const statuses = require('../data/statuses');
const classes = require('../data/classes');
const zodiacs = require('../data/zodiacs');
const monsterSkills = require('../data/monster-skills');

module.exports.loaderForFileName = (filename) => {
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
        case 'zodiachelp.txt':
            return zodiacs;
        default:
            return null;
    }
};