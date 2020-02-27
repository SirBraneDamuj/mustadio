const mock = require('mock-require');
mock('../../src/config', { FFTBG_DATA_STRATEGY: 'fake' });
const zodiacs = require('../../src/data/zodiacs');
const expect = require('chai').expect;

describe('ZODIACS', () => {
    before(async () => {
        await zodiacs.reload('force');
    });
    const subject = (zodiac) => zodiacs.getZodiac(zodiac);

    it('loads scorpio correctly', () => {
        expect(subject('scorpio')).to.deep.eq({
            name: 'Scorpio',
            info: 'Best/Worst - Taurus; Good - Pisces, Cancer; Bad - Aquarius, Leo',
        });
    });

    it('loads serpentarius correctly', () => {
        expect(subject('serpentarius')).to.deep.eq({
            name: 'Serpentarius',
            info: 'Neutral to all',
        });
    });
});