/* eslint-disable max-lines-per-function, no-undefined */
const loader = require('../../src/data/loader');
const fs = require('fs');
const path = require('path');

const expect = require('chai').expect;

describe('loadTeamFromString', () => {
    let result = '';

    const getResult = (teamName) => {
        const data = fs.readFileSync(path.join(__dirname, '..', '..', 'resources', `${teamName}.txt`), 'utf-8');
        result = loader.loadTeamFromString(data);
    };

    it('loads the red team correctly', () => {
        getResult('red');
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

    it('loads the blue team correctly', () => {
        getResult('blue');
        expect(result).to.deep.eq(
            [{
                name: 'Felbourne',
                gender: 'Female',
                zodiac: 'Scorpio',
                brave: '65',
                faith: '52',
                class: 'Mime',
                activeSkill: '',
                reactSkill: 'Caution',
                supportSkill: 'Attack UP',
                moveSkill: 'Waterbreathing',
                mainAbilities: ['Mimic'],
                subAbilities: [],
                gear: ['Golden Hairpin', 'Leather Outfit', 'Defense Armlet'],
                raw: 'Felbourne - Female - Scorpio - 65 - 52 - Mime -  - Caution - Attack UP - Waterbreathing - Golden Hairpin - Leather Outfit - Defense Armlet - Mimic - ',
            }, {
                name: 'RagequitSA',
                gender: 'Male',
                zodiac: 'Cancer',
                brave: '67',
                faith: '46',
                class: 'Mime',
                activeSkill: '',
                reactSkill: 'Distribute',
                supportSkill: 'Equip Shield',
                moveSkill: 'Waterwalking',
                mainAbilities: ['Mimic'],
                subAbilities: [],
                gear: ['Crystal Shield', 'Black Hood', 'Leather Outfit', 'Defense Ring'],
                raw: 'RagequitSA - Male - Cancer - 67 - 46 - Mime -  - Distribute - Equip Shield - Waterwalking - Crystal Shield - Black Hood - Leather Outfit - Defense Ring - Mimic - ',
            }, {
                name: 'Wackman3000',
                gender: 'Female',
                zodiac: 'Taurus',
                brave: '76',
                faith: '64',
                class: 'Thief',
                activeSkill: 'Elemental',
                reactSkill: 'Distribute',
                supportSkill: 'Equip Gun',
                moveSkill: 'Levitate',
                mainAbilities: ['Gil Taking', 'Steal Heart', 'Steal Helmet', 'Steal Armor', 'Steal Weapon', 'Steal Accessory', 'Leg Aim'],
                subAbilities: ['Pitfall', 'Hell Ivy', 'Hallowed Ground', 'Local Quake', 'Static Shock', 'Will-O-Wisp', 'Quicksand', 'Sand Storm', 'Blizzard', 'Gusty Wind', 'Lava Ball'],
                gear: ['Assassin Dagger', 'Flash Hat', 'Black Costume', 'Battle Boots'],
                raw: 'Wackman3000 - Female - Taurus - 76 - 64 - Thief - Elemental - Distribute - Equip Gun - Levitate - Assassin Dagger - Flash Hat - Black Costume - Battle Boots - Gil Taking, Steal Heart, Steal Helmet, Steal Armor, Steal Weapon, Steal Accessory, Leg Aim - Pitfall, Hell Ivy, Hallowed Ground, Local Quake, Static Shock, Will-O-Wisp, Quicksand, Sand Storm, Blizzard, Gusty Wind, Lava Ball',
            }, {
                name: 'ChiefChiefman',
                gender: 'Male',
                zodiac: 'Cancer',
                brave: '50',
                faith: '74',
                class: 'Chemist',
                activeSkill: 'Elemental',
                reactSkill: 'MP Restore',
                supportSkill: 'Dual Wield',
                moveSkill: 'Move-HP Up',
                mainAbilities: ['Potion', 'Hi-Potion', 'X-Potion', 'Soft', 'Holy Water', 'Phoenix Down'],
                subAbilities: ['Pitfall', 'Water Ball', 'Hallowed Ground', 'Will-O-Wisp', 'Blizzard'],
                gear: ['Romanda Gun', 'Mythril Gun', 'Headgear', 'Chain Vest', 'Dracula Mantle'],
                raw: 'ChiefChiefman - Male - Cancer - 50 - 74 - Chemist - Elemental - MP Restore - Dual Wield - Move-HP Up - Romanda Gun - Mythril Gun - Headgear - Chain Vest - Dracula Mantle - Potion, Hi-Potion, X-Potion, Soft, Holy Water, Phoenix Down - Pitfall, Water Ball, Hallowed Ground, Will-O-Wisp, Blizzard',
            }]
        );
    });
});