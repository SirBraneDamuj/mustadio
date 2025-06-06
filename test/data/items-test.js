/* eslint-disable max-lines-per-function, no-undefined */
const mock = require('mock-require');
mock('../../src/config', { FFTBG_DATA_STRATEGY: 'fake' });
const items = require('../../src/data/items');
const expect = require('chai').expect;
const map = require('lodash/map');

const defaultStats = {
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
    initialStatuses: [],
    permStatuses: [],
}

describe('ITEMS', () => {
    before(async () => {
        await items.reload('force');
    });
    const subject = (itemName) => items.getItem(itemName);

    it('loads knight swords correctly', () => {
        expect(subject('Nagrarock')).to.deep.eq({
            name: 'Nagrarock',
            slot: 'hand',
            type: 'Sword',
            info: '1 WP, 1 range, 50% evade, Sword. Element: Dark. Effect: Chance to add Frog; Permanent Evil, Float.',
            stats: {
                ...defaultStats,
                wp: 1,
                range: 1,
                evadePercent: 50,
                element: 'Dark',
                permStatuses: ['Evil', 'Float'],
            }
        });
    })

    it('loads sticks correctly', () => {
        expect(subject('Octagon Rod')).to.deep.eq({
            name: 'Octagon Rod',
            slot: 'hand',
            type: 'Pole',
            info: "12 WP, 2 range, 20% evade, Pole. Effect: Chance to Cancel Darkness, Silence, Oil, Frog, Poison, Slow, Stop, Don't Move, Don't Act.",
            stats: {
                ...defaultStats,
                wp: 12,
                range: 2,
                evadePercent: 20,
            },
        });
    });

    it('loads hats correctly', () => {
        console.log(subject('Thief Hat'));
        expect(subject('Thief Hat')).to.deep.eq({
            name: 'Thief Hat',
            slot: 'head',
            type: 'Hat',
            info: "+64 HP, +0 MP, Hat. Effect: +2 Speed; Immune Don't Move.",
            stats: {
                ...defaultStats,
                hp: 64,
                speed: 2,
            },
        });
    });

    it('loads lances correctly', () => {
        expect(subject('Holy Lance')).to.deep.eq({
            name: 'Holy Lance',
            slot: 'hand',
            type: 'Spear',
            info: "14 WP, 2 range (line), 10% evade, Spear. Element: Holy. Effect: Chance to cast Holy.",
            stats: {
                ...defaultStats,
                wp: 14,
                range: 2,
                evadePercent: 10,
                element: 'Holy',
            },
        });
    });

    it('loads armor correctly', () => {
        expect(subject('Reflect Mail')).to.deep.eq({
            name: 'Reflect Mail',
            slot: 'body',
            type: 'Armor',
            info: '+120 HP, +0 MP, Armor. Effect: Always Reflect.',
            stats: {
                ...defaultStats,
                hp: 120,
                permStatuses: ['Reflect'],
            },
        });
    });

    it('loads accessories correctly', () => {
        expect(subject('Salty Rage')).to.deep.eq({
            name: 'Salty Rage',
            slot: 'accessory',
            type: 'Accessory',
            info: 'Accessory. Effect: Permanent Protect, Shell.',
            stats: {
                ...defaultStats,
                permStatuses: ['Protect', 'Shell'],
            },
        });
    });

    // Small Mantle: 10% physical evade, 10% magic evade, Accessory (mantle). Effect: +1 Speed.

    it('loads mantles correctly', () => {
        expect(subject('Small Mantle')).to.deep.eq({
            name: 'Small Mantle',
            slot: 'accessory',
            type: 'Accessory (mantle)',
            info: '10% physical evade, 10% magic evade, Accessory (mantle). Effect: +1 Speed.',
            stats: {
                ...defaultStats,
                physEvadePercent: 10,
                magicEvadePercent: 10,
                speed: 1,
            },
        });
    });

    it('loads hunting bow correctly', () => {
        expect(subject('Hunting Bow')).to.deep.eq({
            name: 'Hunting Bow',
            slot: 'hand',
            type: 'Crossbow',
            info: '9 WP, 5 range, 5% evade, Crossbow.',
            stats: {
                ...defaultStats,
                wp: 9,
                range: 5,
                evadePercent: 5,
            },
        });
    });

    it('loads ice rod', () => {
        expect(subject('Ice Rod')).to.deep.eq({
            name: 'Ice Rod',
            slot: 'hand',
            type: 'Rod',
            info: '3 WP, 1 range, 20% evade, Rod. Element: Ice. Effect: Chance to cast Ice; Strengthen Ice.',
            stats: {
                ...defaultStats,
                wp: 3,
                range: 1,
                evadePercent: 20,
                element: 'Ice',
            },
        });
    });

    it('loads cursed ring', () => {
        expect(subject('Cursed Ring')).to.deep.eq({
            name: 'Cursed Ring',
            slot: 'accessory',
            type: 'Accessory',
            info: 'Accessory. Effect: +1 PA, +1 MA, +1 Speed; Strengthen Dark; Permanent Undead.',
            stats: {
                ...defaultStats,
                speed: 1,
                pa: 1,
                ma: 1,
                permStatuses: ['Undead'],
            },
        });
    });

    it('loads flash hat', () => {
        expect(subject('Flash Hat')).to.deep.eq({
            name: 'Flash Hat',
            slot: 'head',
            type: 'Hat',
            info: '+88 HP, +15 MP, Hat. Effect: +1 MA, +1 Speed.',
            stats: {
                ...defaultStats,
                hp: 88,
                mp: 15,
                speed: 1,
                ma: 1,
            },
        });
    });

    it('loads mace of zeus', () => {
        expect(subject('Mace of Zeus')).to.deep.eq({
            name: 'Mace of Zeus',
            slot: 'hand',
            type: 'Staff',
            info: '7 WP, 1 range, 15% evade, Staff. Effect: +2 PA, +1 MA.',
            stats: {
                ...defaultStats,
                wp: 7,
                range: 1,
                evadePercent: 15,
                pa: 2,
                ma: 1,
            },
        });
    });

    it('loads barbuta', () => {
        expect(subject('Barbuta')).to.deep.eq({
            name: 'Barbuta',
            slot: 'head',
            type: 'Helmet',
            info: '+52 HP, +0 MP, Helmet. Effect: +1 Jump.',
            stats: {
                ...defaultStats,
                hp: 52,
                jump: 1,
            },
        });
    });

    it('loads angel ring', () => {
        expect(subject('Angel Ring')).to.deep.eq({
            name: 'Angel Ring',
            slot: 'accessory',
            type: 'Accessory',
            info: 'Accessory. Effect: Immune Death, Darkness; Initial Reraise.',
            stats: {
                ...defaultStats,
                initialStatuses: ['Reraise'],
            },
        });
    });

    it('loads germinas boots', () => {
        expect(subject('Germinas Boots')).to.deep.eq({
            name: 'Germinas Boots',
            slot: 'accessory',
            type: 'Accessory',
            info: 'Accessory. Effect: +1 Move, +1 Jump.',
            stats: {
                ...defaultStats,
                move: 1,
                jump: 1,
            },
        });
    });

    it('loads secret clothes', () => {
        expect(subject('Secret Clothes')).to.deep.eq({
            name: 'Secret Clothes',
            slot: 'body',
            type: 'Clothes',
            info: '+44 HP, +0 MP, Clothes. Effect: +2 Speed; Initial Transparent.',
            stats: {
                ...defaultStats,
                hp: 44,
                speed: 2,
                initialStatuses: ['Transparent'],
            },
        });
    });

    it('loads healing staff', () => {
        expect(subject('Healing Staff')).to.deep.eq({
            name: 'Healing Staff',
            slot: 'hand',
            type: 'Staff',
            info: '4 WP (heal), 1 range, 17% evade, Staff.',
            stats: {
                ...defaultStats,
                healWp: 4,
                range: 1,
                evadePercent: 17,
            },
        });
    });

    it('loads bloody strings', () => {
        expect(subject('Bloody Strings')).to.deep.eq({
            name: 'Bloody Strings',
            slot: 'hand',
            type: 'Harp',
            info: '12 WP (absorb), 3 range, 12% evade, Harp. Effect: Immune Silence.',
            stats: {
                ...defaultStats,
                absorbWp: 12,
                range: 3,
                evadePercent: 12,
            },
        });
    });

    it('loads panther bag', () => {
        expect(subject('Panther Bag')).to.deep.eq({
            name: 'Panther Bag',
            slot: 'hand',
            type: 'Bag',
            info: '12 WP, 1 range, 1% evade, Bag. Effect: Permanent Regen; Strengthen Earth.',
            stats: {
                ...defaultStats,
                wp: 12,
                range: 1,
                evadePercent: 1,
                permStatuses: ['Regen'],
            },
        });
    });

    it('loads excalibur', () => {
        expect(subject('Excalibur')).to.deep.eq({
            name: 'Excalibur',
            slot: 'hand',
            type: 'Knight Sword',
            info: '22 WP, 1 range, 35% evade, Knight Sword. Effect: Initial Haste; Absorb Holy; Strengthen Holy.',
            stats: {
                ...defaultStats,
                wp: 22,
                range: 1,
                evadePercent: 35,
                initialStatuses: ['Haste'],
            },
        });
    });

    it('loads red shoes', () => {
        expect(subject('Red Shoes')).to.deep.eq({
            name: 'Red Shoes',
            slot: 'accessory',
            type: 'Accessory',
            info: 'Accessory. Effect: +1 MA, +1 Move.',
            stats: {
                ...defaultStats,
                ma: 1,
                move: 1,
            },
        });
    });

    it('loads faith rod', () => {
        expect(subject('Faith Rod')).to.deep.eq({
            name: 'Faith Rod',
            slot: 'hand',
            type: 'Rod',
            info: '5 WP, 1 range, 20% evade, Rod. Effect: Chance to Add Faith; +1 Speed, +1 Move, +1 Jump; Immune Innocent; Initial Faith.',
            stats: {
                ...defaultStats,
                wp: 5,
                range: 1,
                evadePercent: 20,
                speed: 1,
                move: 1,
                jump: 1,
                initialStatuses: [
                    'Faith'
                ]
            },
        });
    });

    it('has no un-slotted items', () => {
        const loadedItems = items.getItems();
        map(loadedItems, (item) => expect(item.slot).to.not.be.undefined);
    });
});
