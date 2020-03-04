const client = require('../client/fftbg');
const indexLoader = require('./index-loader');
const items = require('../data/items');
const abilities = require('../data/abilities');
const statuses = require('../data/statuses');
const classes = require('../data/classes');
const zodiacs = require('../data/zodiacs');
const monsterSkills = require('../data/monster-skills');

const CADENCE = 60 * 1000; // one minute

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
        case 'zodiachelp.txt':
            return zodiacs;
        default:
            return null;
    }
};

const loadDumps = async () => {
    const { data } = await client.tournamentList();
    const { dumpFiles } = indexLoader.load(data);
    await Promise.all(
        dumpFiles.map(async ({ name, timestamp }) => {
            const loader = loaderForFileName(name);
            if (loader) {
                return loader.reload(timestamp);
            }
            return Promise.resolve();
        }),
    );
};

const monitor = async () => {
    console.log('Loading latest dumps');
    try {
        await loadDumps();
    } catch (err) {
        console.log(err);
    }
    setTimeout(monitor, CADENCE);
};

module.exports.monitorDumps = () => {
    setTimeout(monitor, 50);
};