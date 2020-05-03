import axios from 'axios';

const client = axios.create({
    baseURL: '/api',
});

async function getLatestMatch() {
    const result = await client.get('/match');
    return result.data;
}

async function getMatch(tournamentId, team1, team2) {
    const result = await client.get(`/match/${tournamentId}/${team1}/${team2}`);
    return result.data;
}

async function getData() {
    const result = await client.get('/data');
    return result.data;
}

export default {
    getLatestMatch,
    getMatch,
    getData,
};

