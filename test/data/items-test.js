/* eslint-disable max-lines-per-function, no-undefined */
const mock = require('mock-require');
mock('../../src/config', { FFTBG_DATA_STRATEGY: 'fake' });
const items = require('../../src/data/items');
const expect = require('chai').expect;
const map = require('lodash/map');

describe('ITEMS', () => {
    const subject = (itemName) => items.getItem(itemName);

    it('loads knight swords correctly', async () => {
        expect(await subject('Nagrarock')).to.deep.eq({
            name: 'Nagrarock',
            slot: 'hand',
            info: '1 WP, 1 range, 50% evade, Sword. Element: Dark. Effect: Chance to add Frog; Permanent Evil, Float.',
            emoji: '&#x270B;',
        });
    })

    it('loads sticks correctly', async () => {
        expect(await subject('Octagon Rod')).to.deep.eq({
            name: 'Octagon Rod',
            slot: 'hand',
            info: "12 WP, 2 range, 20% evade, Pole. Effect: Chance to Cancel Darkness, Silence, Oil, Frog, Poison, Slow, Stop, Don't Move, Don't Act.",
            emoji: '&#x270B;',
        });
    });

    it('loads hats correctly', async () => {
        expect(await subject('Thief Hat')).to.deep.eq({
            name: 'Thief Hat',
            slot: 'head',
            info: "+64 HP, +0 MP, Hat. Effect: +2 Speed; Immune Don't Move.",
            emoji: '&#x1F3A9;',
        });
    });

    it('loads armor correctly', async () => {
        expect(await subject('Reflect Mail')).to.deep.eq({
            name: 'Reflect Mail',
            slot: 'body',
            info: '+120 HP, +0 MP, Armor. Effect: Always Reflect.',
            emoji: '&#x1F455;',
        });
    });

    it('loads accessories correctly', async () => {
        expect(await subject('Salty Rage')).to.deep.eq({
            name: 'Salty Rage',
            slot: 'accessory',
            info: 'Accessory. Effect: Permanent Protect, Shell.',
            emoji: '&#x1F48D;'
        });
    });

    it('loads hunting bow correctly', async () => {
        expect(await subject('Hunting Bow')).to.deep.eq({
            name: 'Hunting Bow',
            slot: 'hand',
            info: '9 WP, 5 range, 5% evade, Crossbow.',
            emoji: '&#x270B;'
        });
    });

    it('loads ice rod', async () => {
        expect(await subject('Ice Rod')).to.deep.eq({
            name: 'Ice Rod',
            slot: 'hand',
            info: '3 WP, 1 range, 20% evade, Rod. Element: Ice. Effect: Chance to cast Ice; Strengthen Ice.',
            emoji: '&#x270B;'
        });
    });

    it('has no un-slotted items', async () => {
        const loadedItems = await items.getItems();
        for (const key in loadedItems) {
            if (loadedItems[key].slot === undefined) {
                console.log(key);
            }
        }
        map(loadedItems, (item) => expect(item.slot).to.not.be.undefined);
    });
});
