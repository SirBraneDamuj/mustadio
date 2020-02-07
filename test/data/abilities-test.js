const mock = require('mock-require');
mock('../../src/config', { FFTBG_DATA_STRATEGY: 'fake' });
const abilities = require('../../src/data/abilities');
const expect = require('chai').expect;

describe('ABILITIES', () => {
    const subject = async (abilityName) => abilities.getAbility(abilityName);

    it('loads usable abilities correctly', async () => {
        expect(await subject('Night Sword')).to.deep.eq({
            name: 'Night Sword',
            info: '2 range, 0 AoE, 3 CT, 22 MP. Effect: AbsorbHP (PA * WP).',
        });
    });

    it('loads item abilities', async () => {
        expect(await subject('Hi-Potion')).to.deep.eq({
            name: 'Hi-Potion',
            info: 'Heals 120 HP.',
        });
    });

    it('loads reaction abilities', async () => {
        expect(await subject('Hamedo')).to.deep.eq({
            name: 'Hamedo',
            info: "On normal attack by a weapon, if attacker is in weapon's range, negate that attack and attack the attacker instead.",
        });
    });

    it('loads support abilities', async () => {
        expect(await subject('Doublehand')).to.deep.eq({
            name: 'Doublehand',
            info: "Uses both of unit's hands to double damage from the weapon.",
        });
    });

    it('loads move abilities', async () => {
        expect(await subject('Teleport')).to.deep.eq({
            name: 'Teleport',
            info: 'Teleport directly instead of walking.',
        });
    });
});