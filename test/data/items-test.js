/* eslint-disable max-lines-per-function, no-undefined */
const items = require('../../src/data/items');

const expect = require('chai').expect;

describe('ITEMS', () => {
    const subject = (itemName) => items.getItem(itemName);

    it('loads knight swords correctly', () => {
        expect(subject('Nagrarock')).to.deep.eq({
            name: 'Nagrarock',
            slot: 'hand',
            info: '1 WP, 1 range, 50% evade, Sword. Element: Dark. Effect: Chance to add Frog; Permanent Evil, Float.',
        });
    })

    it('loads sticks correctly', () => {
        expect(subject('Octagon Rod')).to.deep.eq({
            name: 'Octagon Rod',
            slot: 'hand',
            info: "12 WP, 2 range, 20% evade, Stick. Effect: Chance to Cancel Darkness, Silence, Oil, Frog, Poison, Slow, Stop, Don't Move, Don't Act.",
        });
    });

    it('loads hats correctly', () => {
        expect(subject('Thief Hat')).to.deep.eq({
            name: 'Thief Hat',
            slot: 'head',
            info: "+64 HP, +0 MP, Hat. Effect: +2 Speed; Immune Don't Move.",
        });
    });

    it('loads armor correctly', () => {
        expect(subject('Reflect Mail')).to.deep.eq({
            name: 'Reflect Mail',
            slot: 'body',
            info: '+120 HP, +0 MP, Armor. Effect: Always Reflect.',
        });
    });

    it('loads accessories correctly', () => {
        expect(subject('Salty Rage')).to.deep.eq({
            name: 'Salty Rage',
            slot: 'accessory',
            info: 'Accessory. Effect: Permanent Protect, Shell.',
        });
    });
});
