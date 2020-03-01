const matchups = require('../../src/data/matchups');
const expect = require('chai').expect;

describe('matchups', () => {
    const subject = (winners) => matchups.getLatestMatchForTournament(winners);

    it('returns red and blue for a brand new tournament', () => {
        expect(subject([])).to.eql(['red', 'blue']);
    });

    it('returns green and yellow after a single match', () => {
        const winners = [
            'red',
        ];
        expect(subject(winners)).to.eql(['green', 'yellow']);
    });

    it('returns white and black after two matches', () => {
        const winners = [
            'red',
            'yellow',
        ];
        expect(subject(winners)).to.eql(['white', 'black']);
    });

    it('returns purple and brown after three matches', () => {
        const winners = [
            'red',
            'yellow',
            'white',
        ];
        expect(subject(winners)).to.eql(['purple', 'brown']);
    });

    it('returns red and yellow after the first round', () => {
        const winners = [
            'red',
            'yellow',
            'white',
            'brown',
        ];
        expect(subject(winners)).to.eql(['red', 'yellow']);
    });

    it('returns white and brown after the first round', () => {
        const winners = [
            'red',
            'yellow',
            'white',
            'brown',
            'yellow',
        ];
        expect(subject(winners)).to.eql(['white', 'brown']);
    });

    it('returns yellow and brown after the second round', () => {
        const winners = [
            'red',
            'yellow',
            'white',
            'brown',
            'yellow',
            'brown',
        ];
        expect(subject(winners)).to.eql(['yellow', 'brown']);
    });

    it('returns brown and champion for the champ round', () => {
        const winners = [
            'red',
            'yellow',
            'white',
            'brown',
            'yellow',
            'brown',
            'brown',
        ];
        expect(subject(winners)).to.eql(['brown', 'champion']);
    });

    it('returns the champion matchup for a completed tournament', () => {
        const winners = [
            'red',
            'yellow',
            'white',
            'brown',
            'yellow',
            'brown',
            'brown',
            'champion',
        ];
        expect(subject(winners)).to.eql(['brown', 'champion']);
    });

    it('returns the default red blue matchup for anything strange', () => {
        const winners = [
            'red',
            'yellow',
            'white',
            'brown',
            'yellow',
            'brown',
            'brown',
            'champion',
            'red',
            'yellow',
            'white',
            'brown',
            'yellow',
            'brown',
            'brown',
            'champion',
        ];
        expect(subject(winners)).to.eql(['red', 'blue']);
    });
});