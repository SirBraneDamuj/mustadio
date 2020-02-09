/* eslint-disable max-lines-per-function, no-undefined */
const mock = require('mock-require');
mock('../../src/config', { FFTBG_DATA_STRATEGY: 'fake' });
const items = require('../../src/data/items');
const expect = require('chai').expect;
const map = require('lodash/map');

describe('ITEMS', () => {
    const subject = async (itemName) => items.getItem(itemName);

    it('loads knight swords correctly', async () => {
        expect(await subject('Nagrarock')).to.deep.eq({
            name: 'Nagrarock',
            slot: 'hand',
            type: 'Sword',
            info: '1 WP, 1 range, 50% evade, Sword. Element: Dark. Effect: Chance to add Frog; Permanent Evil, Float.',
            stats: {
                wp: 1,
                healWp: 0,
                absorbWp: 0,
                range: 1,
                evadePercent: 50,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 0,
                mp: 0,
                element: 'Dark',
                speed: 0,
                move: 0,
                jump: 0,
                pa: 0,
                ma: 0,
            }
        });
    })

    it('loads sticks correctly', async () => {
        expect(await subject('Octagon Rod')).to.deep.eq({
            name: 'Octagon Rod',
            slot: 'hand',
            type: 'Pole',
            info: "12 WP, 2 range, 20% evade, Pole. Effect: Chance to Cancel Darkness, Silence, Oil, Frog, Poison, Slow, Stop, Don't Move, Don't Act.",
            stats: {
                wp: 12,
                healWp: 0,
                absorbWp: 0,
                range: 2,
                evadePercent: 20,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 0,
                mp: 0,
                element: undefined,
                speed: 0,
                move: 0,
                jump: 0,
                pa: 0,
                ma: 0,
            },
        });
    });

    it('loads hats correctly', async () => {
        expect(await subject('Thief Hat')).to.deep.eq({
            name: 'Thief Hat',
            slot: 'head',
            type: 'Hat',
            info: "+64 HP, +0 MP, Hat. Effect: +2 Speed; Immune Don't Move.",
            stats: {
                wp: 0,
                healWp: 0,
                absorbWp: 0,
                range: 0,
                evadePercent: 0,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 64,
                mp: 0,
                element: undefined,
                speed: 2,
                move: 0,
                jump: 0,
                pa: 0,
                ma: 0,
            },
        });
    });

    it('loads armor correctly', async () => {
        expect(await subject('Reflect Mail')).to.deep.eq({
            name: 'Reflect Mail',
            slot: 'body',
            type: 'Armor',
            info: '+120 HP, +0 MP, Armor. Effect: Always Reflect.',
            stats: {
                wp: 0,
                healWp: 0,
                absorbWp: 0,
                range: 0,
                evadePercent: 0,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 120,
                mp: 0,
                element: undefined,
                speed: 0,
                move: 0,
                jump: 0,
                pa: 0,
                ma: 0,
            },
        });
    });

    it('loads accessories correctly', async () => {
        expect(await subject('Salty Rage')).to.deep.eq({
            name: 'Salty Rage',
            slot: 'accessory',
            type: 'Accessory',
            info: 'Accessory. Effect: Permanent Protect, Shell.',
            stats: {
                wp: 0,
                healWp: 0,
                absorbWp: 0,
                range: 0,
                evadePercent: 0,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 0,
                mp: 0,
                element: undefined,
                speed: 0,
                move: 0,
                jump: 0,
                pa: 0,
                ma: 0,
            },
        });
    });

    it('loads hunting bow correctly', async () => {
        expect(await subject('Hunting Bow')).to.deep.eq({
            name: 'Hunting Bow',
            slot: 'hand',
            type: 'Crossbow',
            info: '9 WP, 5 range, 5% evade, Crossbow.',
            stats: {
                wp: 9,
                healWp: 0,
                absorbWp: 0,
                range: 5,
                evadePercent: 5,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 0,
                mp: 0,
                element: undefined,
                speed: 0,
                move: 0,
                jump: 0,
                pa: 0,
                ma: 0,
            },
        });
    });

    it('loads ice rod', async () => {
        expect(await subject('Ice Rod')).to.deep.eq({
            name: 'Ice Rod',
            slot: 'hand',
            type: 'Rod',
            info: '3 WP, 1 range, 20% evade, Rod. Element: Ice. Effect: Chance to cast Ice; Strengthen Ice.',
            stats: {
                wp: 3,
                healWp: 0,
                absorbWp: 0,
                range: 1,
                evadePercent: 20,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 0,
                mp: 0,
                element: 'Ice',
                speed: 0,
                move: 0,
                jump: 0,
                pa: 0,
                ma: 0,
            },
        });
    });

    it('loads cursed ring', async () => {
        expect(await subject('Cursed Ring')).to.deep.eq({
            name: 'Cursed Ring',
            slot: 'accessory',
            type: 'Accessory',
            info: 'Accessory. Effect: +1 PA, +1 MA, +1 Speed; Strengthen Dark; Permanent Undead.',
            stats: {
                wp: 0,
                healWp: 0,
                absorbWp: 0,
                range: 0,
                evadePercent: 0,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 0,
                mp: 0,
                element: undefined,
                speed: 1,
                move: 0,
                jump: 0,
                pa: 1,
                ma: 1,
            },
        });
    });

    it('loads flash hat', async () => {
        expect(await subject('Flash Hat')).to.deep.eq({
            name: 'Flash Hat',
            slot: 'head',
            type: 'Hat',
            info: '+88 HP, +15 MP, Hat. Effect: +1 MA, +1 Speed.',
            stats: {
                wp: 0,
                healWp: 0,
                absorbWp: 0,
                range: 0,
                evadePercent: 0,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 88,
                mp: 15,
                element: undefined,
                speed: 1,
                move: 0,
                jump: 0,
                pa: 0,
                ma: 1,
            },
        });
    });

    it('loads mace of zeus', async () => {
        expect(await subject('Mace of Zeus')).to.deep.eq({
            name: 'Mace of Zeus',
            slot: 'hand',
            type: 'Staff',
            info: '7 WP, 1 range, 15% evade, Staff. Effect: +2 PA, +1 MA.',
            stats: {
                wp: 7,
                healWp: 0,
                absorbWp: 0,
                range: 1,
                evadePercent: 15,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 0,
                mp: 0,
                element: undefined,
                speed: 0,
                move: 0,
                jump: 0,
                pa: 2,
                ma: 1,
            },
        });
    });

    it('loads barbuta', async () => {
        expect(await subject('Barbuta')).to.deep.eq({
            name: 'Barbuta',
            slot: 'head',
            type: 'Helmet',
            info: '+52 HP, +0 MP, Helmet. Effect: +1 Jump.',
            stats: {
                wp: 0,
                healWp: 0,
                absorbWp: 0,
                range: 0,
                evadePercent: 0,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 52,
                mp: 0,
                element: undefined,
                speed: 0,
                move: 0,
                jump: 1,
                pa: 0,
                ma: 0,
            },
        });
    });

    it('loads germinas boots', async () => {
        expect(await subject('Germinas Boots')).to.deep.eq({
            name: 'Germinas Boots',
            slot: 'accessory',
            type: 'Accessory',
            info: 'Accessory. Effect: +1 Move, +1 Jump.',
            stats: {
                wp: 0,
                healWp: 0,
                absorbWp: 0,
                range: 0,
                evadePercent: 0,
                physEvadePercent: 0,
                magicEvadePercent: 0,
                hp: 0,
                mp: 0,
                element: undefined,
                speed: 0,
                move: 1,
                jump: 1,
                pa: 0,
                ma: 0,
            },
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
