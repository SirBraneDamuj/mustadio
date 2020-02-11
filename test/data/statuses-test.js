/* eslint-disable max-lines-per-function */
const mock = require('mock-require');
mock('../../src/config', { FFTBG_DATA_STRATEGY: 'fake' });
const statuses = require('../../src/data/statuses');
const expect = require('chai').expect;

describe('STATUSES', () => {
    const subject = async (statusName) => statuses.getStatus(statusName);

    it('loads Innocent correctly', async () => {
        expect(await subject('Innocent')).to.deep.eq({
            name: 'Innocent',
            info: "Unit's effective Faith is 0, which provides complete immunity to Faith-based Magic.",
        });
    });

    it('loads Undead correctly', async () => {
        expect(await subject('Undead')).to.deep.eq({
            name: 'Undead',
            info: "Most healing does damage instead. Instead of crystalizing after three turns when dead, has a 50% chance to revive.",
        });
    });
});
