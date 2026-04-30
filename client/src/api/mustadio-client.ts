import axios from 'axios';
import {
    LatestMatchResponseSchema,
    FullMatchResponseSchema,
    GameDataResponseSchema,
    type LatestMatchResponse,
    type FullMatchResponse,
    type GameDataResponse,
} from '../schemas';

const client = axios.create({
    baseURL: '/api',
});

async function getLatestMatch(): Promise<LatestMatchResponse> {
    const result = await client.get('/match');
    return LatestMatchResponseSchema.parse(result.data);
}

async function getMatch(tournamentId: string, team1: string, team2: string): Promise<FullMatchResponse> {
    const result = await client.get(`/match/${tournamentId}/${team1}/${team2}`);
    return FullMatchResponseSchema.parse(result.data);
}

async function getData(): Promise<GameDataResponse> {
    const result = await client.get('/data');
    return GameDataResponseSchema.parse(result.data);
}

export default {
    getLatestMatch,
    getMatch,
    getData,
};
