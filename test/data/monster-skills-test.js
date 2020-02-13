const mock = require('mock-require');
mock('../../src/config', { FFTBG_DATA_STRATEGY: 'fake' });
const monsterSkills = require('../../src/data/monster-skills');
const expect = require('chai').expect;

describe('MONSTER SKILLS', () => {
    before(async () => {
        await monsterSkills.reload('force');
    });
    const subject = (monsterName) => monsterSkills.getSkillsForMonster(monsterName);

    it('loads serpentarius correctly', () => {
        expect(subject('Serpentarius')).to.include(
            'Snake Carrier',
            'Toxic Frog',
            'Midgar Swarm',
            'Scream',
        );
    });

    it('loads Apanda', () => {
        expect(subject('Apanda')).to.include(
            'Bio Tenebris',
            'Bio Venenum',
            'Bio Oleum',
            'Bio Ranae',
            'Bio Sanctus',
            'Bio Silentium',
            'Bio Lapis',
            'Bio Immortus',
            'Bio Mortem',
            'Bio Insanis',
        );
    });
});
