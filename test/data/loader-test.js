const loader = require('../../src/data/loader');
const fs = require('fs');
const path = require('path');

const expect = require('chai').expect;

describe('loadTeamFromString', () => {
    let teamName;
    let result;

    beforeEach(() => {
        const data = fs.readFileSync(path.join(__dirname, '..', '..', 'resources', `${teamName}.txt`), 'utf-8');
        result = loader.loadTeamFromString(data);
    });

    // TODO - write similar tests for each sample team
    // TODO - get weird sample teams to ensure the loader is robust
    context('red team', () => {
        teamName = 'red';
        it('loads the team correctly', () => {
            expect(result).to.deep.eq(
                [{
                    name: 'KIYOMORI',
                    gender: 'Monster',
                    zodiac: 'Pisces',
                    brave: '72',
                    faith: '44',
                    class: 'Porky',
                    activeSkill: undefined,
                    reactSkill: undefined,
                    supportSkill: undefined,
                    moveSkill: undefined,
                    mainAbilities: [],
                    subAbilities: [],
                    gear: [],
                    raw: 'KIYOMORI - Monster - Pisces - 72 - 44 - Porky',
                }, {
                    name: 'Zmobie',
                    gender: 'Monster',
                    zodiac: 'Capricorn',
                    brave: '62',
                    faith: '64',
                    class: 'Ultima Demon',
                    activeSkill: undefined,
                    reactSkill: undefined,
                    supportSkill: undefined,
                    moveSkill: undefined,
                    mainAbilities: [],
                    subAbilities: [],
                    gear: [],
                    raw: 'Zmobie - Monster - Capricorn - 62 - 64 - Ultima Demon',
                }, {
                    name: 'ShintaroNayaka',
                    gender: 'Monster',
                    zodiac: 'Capricorn',
                    brave: '42',
                    faith: '50',
                    class: 'Sekhret',
                    activeSkill: undefined,
                    reactSkill: undefined,
                    supportSkill: undefined,
                    moveSkill: undefined,
                    mainAbilities: [],
                    subAbilities: [],
                    gear: [],
                    raw: 'ShintaroNayaka - Monster - Capricorn - 42 - 50 - Sekhret',
                }, {
                    name: 'Cyuub',
                    gender: 'Male',
                    zodiac: 'Gemini',
                    brave: '65',
                    faith: '68',
                    class: 'Priest',
                    activeSkill: 'Time Magic',
                    reactSkill: 'Absorb Used MP',
                    supportSkill: 'Beastmaster',
                    moveSkill: 'Jump+3',
                    mainAbilities: ['Cure 2', 'Raise', 'Regen', 'Esuna'],
                    subAbilities: ['Slow 2', 'Stop', 'Stabilize Time', 'Galaxy Stop'],
                    gear: ['Oak Staff', 'Thief Hat', 'Leather Vest', 'Dracula Mantle'],
                    raw: 'Cyuub - Male - Gemini - 65 - 68 - Priest - Time Magic - Absorb Used MP - Beastmaster - Jump+3 - Oak Staff - Thief Hat - Leather Vest - Dracula Mantle - Cure 2, Raise, Regen, Esuna - Slow 2, Stop, Stabilize Time, Galaxy Stop',
                }]
            );
        });
    });
});