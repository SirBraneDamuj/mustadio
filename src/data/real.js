const axios = require('axios');

const client = axios.create({
    baseURL: process.env['FFTBG_BASE_URL'],
    responseType: 'text',
});

const tournamentIdRegex = /tournament_\d{13}/gm;

module.exports.getCurrentTournamentId = async () => {
    const response = await client.get('/');
    return [...response.data.matchAll(tournamentIdRegex)].pop().pop();
};

module.exports.getTeamData = async (tournamentId, teamName) => {
    const { data } = await client.get(`/${tournamentId}/${teamName}.txt`);
    return data;
};