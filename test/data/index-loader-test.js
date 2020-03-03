const indexLoader = require('../../src/loader/index-loader');
const fakeClient = require('../../src/client/fftbg/fake');
const expect = require('chai').expect;

describe('indexloader', () => {
    let html = '';

    before(async () => {
        html = await fakeClient.tournamentList();
    });

    const subject = () => indexLoader.load(html.data);

    it('parses out the latest tournament ID', () => {
        const { latestTournament } = subject();
        expect(latestTournament).to.eq('tournament_1581051562581');
    });

    it('parses out the timestamp for each dump file', () => {
        const { dumpFiles } = subject();
        expect(dumpFiles).to.deep.include.members([{
            name: 'infoitem.txt',
            timestamp: '2020-02-06 13:04',
        }, {
            name: 'infoability.txt',
            timestamp: '2020-02-06 11:49',
        }, {
            name: 'classhelp.txt',
            timestamp: '2020-02-06 16:39',
        }, {
            name: 'infostatus.txt',
            timestamp: '2020-02-01 19:02',
        }]);
    });
});