const axios = require('axios');
const config = require('../../config');

const client = axios.create({
    baseURL: config.FFTBG_BASE_URL,
    responseType: 'text',
});

module.exports.classInfo = async () => client.get('/classhelp.txt');

module.exports.itemInfo = async () => client.get('/infoitem.txt');

module.exports.abilityInfo = async () => client.get('/infoability.txt');

module.exports.statusInfo = async () => client.get('/infostatus.txt');

module.exports.tournamentTeam = async (tournamentId, teamName) => client.get(`/${tournamentId}/${teamName}.txt`);

module.exports.tournamentList = async () => client.get('/');