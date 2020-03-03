const items = require('./items');
const abilities = require('./abilities');
const statuses = require('./statuses');
const classes = require('./classes');
const zodiacs = require('./zodiacs');
const monsterSkills = require('./monster-skills');

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