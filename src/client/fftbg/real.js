const axios = require('axios');

const client = axios.create({
    baseURL: process.env['FFTBG_BASE_URL'],
    responseType: 'text',
});

module.exports.itemInfo = async () => axios.get('/iteminfo.txt');

module.exports.tournamentTeam = async (tournamentId, teamName) => {
    const { data } = await client.get(`/${tournamentId}/${teamName}.txt`);
    return data;
}