/* eslint-disable max-lines-per-function */

const mock = require('mock-require');
mock('../../src/config', { FFTBG_DATA_STRATEGY: 'fake' });
const classes = require('../../src/data/classes');
const expect = require('chai').expect;

describe('CLASSES', () => {
    let className = '';
    let gender = '';
    const subject = async () => classes.getClass(className, gender);

    context('Squire', () => {
        beforeEach(() => {
            className = 'Squire';
        });

        context('Male', () => {
            it('loads correctly', async () => {
                gender = 'Male';
                expect(await subject()).to.deep.eq({
                    name: className,
                    gender,
                    baseStats: {
                        hp: 173,
                        mp: 47,
                        move: 4,
                        jump: 3,
                        speed: 9,
                        pa: 8,
                        ma: 7,
                        cEvPercent: 7
                    },
                    innates: ['Basic Skill'],
                    raw: "Squire Male's base stats: 173 HP, 47 MP, 4 Move, 3 Jump, 9 Speed, 8 PA, 7 MA, 7% C-EV. Innates: Basic Skill. Equips: Knives, Swords, Axes, Flails, Crossbows, Hats, Clothing, uncommonly [Shields, Armor, and Helmets].",
                });
            });
        });

        context('Female', () => {
            it('loads correctly', async () => {
                gender = 'Female';
                expect(await subject()).to.deep.eq({
                    name: className,
                    gender,
                    baseStats: {
                        hp: 162,
                        mp: 50,
                        move: 4,
                        jump: 3,
                        speed: 9,
                        pa: 7,
                        ma: 8,
                        cEvPercent: 7
                    },
                    innates: ['Basic Skill'],
                    raw: "Squire Female's base stats: 162 HP, 50 MP, 4 Move, 3 Jump, 9 Speed, 7 PA, 8 MA, 7% C-EV. Innates: Basic Skill. Equips: Knives, Swords, Axes, Flails, Crossbows, Hats, Clothing, uncommonly [Shields, Armor, and Helmets].",
                });
            });
        });
    });

    context('Ninja', () => {
        beforeEach(() => {
            className = 'Ninja';
        });

        context('Male', () => {
            it('loads correctly', async () => {
                gender = 'Male';
                expect(await subject()).to.deep.eq({
                    name: className,
                    gender,
                    baseStats: {
                        hp: 113,
                        mp: 32,
                        move: 4,
                        jump: 3,
                        speed: 11,
                        pa: 11,
                        ma: 5,
                        cEvPercent: 25
                    },
                    innates: ['Throw', 'Dual Wield'],
                    raw: "Ninja Male's base stats: 113 HP, 32 MP, 4 Move, 3 Jump, 11 Speed, 11 PA, 5 MA, 25% C-EV. Innates: Throw, Dual Wield. Equips: Knives, Ninja Swords, Flails, Hats, Clothing.",
                });
            });
        });

        context('Female', () => {
            it('loads correctly', async () => {
                gender = 'Female';
                expect(await subject()).to.deep.eq({
                    name: className,
                    gender,
                    baseStats: {
                        hp: 106,
                        mp: 34,
                        move: 4,
                        jump: 3,
                        speed: 11,
                        pa: 9,
                        ma: 6,
                        cEvPercent: 25
                    },
                    innates: ['Throw', 'Dual Wield'],
                    raw: "Ninja Female's base stats: 106 HP, 34 MP, 4 Move, 3 Jump, 11 Speed, 9 PA, 6 MA, 25% C-EV. Innates: Throw, Dual Wield. Equips: Knives, Ninja Swords, Flails, Hats, Clothing.",
                });
            });
        });
    });

    context('Serpentarius', () => {
        it('loads correctly', async () => {
            className = 'Serpentarius';
            gender = 'Monster'
            expect(await subject()).to.deep.eq({
                name: className,
                gender,
                baseStats: {
                    hp: 505,
                    mp: 82,
                    move: 4,
                    jump: 3,
                    speed: 6,
                    pa: 9,
                    ma: 13,
                    cEvPercent: 12
                },
                innates: ['Counter', 'Landlocked', 'Sicken', 'Move-MP Up'],
                raw: "Serpentarius's base stats: 505 HP, 82 MP, 4 Move, 3 Jump, 6 Speed, 9 PA, 13 MA, 12% C-EV. Innates: Counter, Landlocked, Sicken, Move-MP Up. Elements: Cancel-Ice, Half-Holy, Weak-Earth.",
            });
        });
    });

    context('FloatingEye', () => {
        it('loads correctly', async () => {
            className = 'FloatingEye';
            gender = 'Monster'
            expect(await subject()).to.deep.eq({
                name: className,
                gender,
                baseStats: {
                    hp: 248,
                    mp: 17,
                    move: 5,
                    jump: 5,
                    speed: 8,
                    pa: 12,
                    ma: 34,
                    cEvPercent: 22
                },
                innates: ['Counter', 'Fly', 'Landlocked', 'Magic Defense UP'],
                raw: "FloatingEye's base stats: 248 HP, 17 MP, 5 Move, 5 Jump, 8 Speed, 12 PA, 34 MA, 22% C-EV. Innates: Counter, Fly, Landlocked, Magic Defense UP. Elements: Half-Ice&Wind&Earth&Water&Dark, Weak-Lightning.",
            });
        });
    });
});