/* eslint-disable max-lines-per-function, no-undefined */
const mock = require('mock-require');
mock('../../src/config', { FFTBG_DATA_STRATEGY: 'fake' });
const stats = require('../../src/data/stats');
const items = require('../../src/data/items');
const classes = require('../../src/data/classes');
const expect = require('chai').expect;

const defaultStats = {
    cEvPercent: 0,
    sPhysEvPercent: 0,
    sMagEvPercent: 0,
    aPhysEvPercent: 0,
    aMagEvPercent: 0,
    hp: 0,
    mp: 0,
    speed: 0,
    move: 0,
    jump: 0,
    pa: 0,
    ma: 0,
    initialStatuses: [],
    permStatuses: [],
}

describe('STATS', () => {
    before(async () => {
        await Promise.all([
            items.reload(),
            classes.reload(),
        ]);
    });
    const subject = (className, gender, itemNames, movementSkill) => {
        const clazz = classes.getClass(className, gender);
        const theseItems = [];
        for (const itemName of itemNames) {
            theseItems.push(items.getItem(itemName));
        }
        return stats.totalStatsForClassAndEquipment(clazz.baseStats, theseItems, movementSkill);
    }

    it('squire male with a full loadout', () => {
        expect(subject('Squire', 'Male', ['Blood Sword', 'Aegis Shield', 'Triangle Hat', 'Reflect Mail', 'Germinas Boots'], 'Jump+2')).to.deep.eq({
            ...defaultStats,
            hp: 173 + 46 + 120,
            mp: 47 + 12,
            move: 5,
            jump: 4 + 1 + 2,
            speed: 9,
            pa: 8,
            ma: 9,
            cEvPercent: 7,
            sPhysEvPercent: 10,
            sMagEvPercent: 50,
            permStatuses: ['Reflect'],
        });
    });

    it('a monster', () => {
        expect(subject('KingBehemoth', 'Monster', [], 'Teleport')).to.deep.eq({
            ...defaultStats,
            hp: 515,
            mp: 30,
            move: 4,
            jump: 3,
            speed: 9,
            pa: 19,
            ma: 39,
            cEvPercent: 15,
        });
    });

    it('timemage female dual wielding with some stuff and a move skill', () => {
        expect(subject('TimeMage', 'Female', ['Ice Rod', 'Mythril Spear', 'Cross Helmet', 'Linen Cuirass', 'Reflect Ring'], 'Move+3')).to.deep.eq({
            ...defaultStats,
            hp: 124 + 74 + 44,
            mp: 101,
            move: 3 + 3,
            jump: 3,
            speed: 8 + 1,
            pa: 4,
            ma: 13 + 1,
            cEvPercent: 7,
            initialStatuses: ['Regen'],
            permStatuses: ['Reflect'],
        });
    });
});