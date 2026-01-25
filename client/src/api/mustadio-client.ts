import axios from 'axios';
import type { MatchResponse, GameData } from '../types';

const client = axios.create({
    baseURL: '/api',
});

async function getLatestMatch(): Promise<MatchResponse> {
    const result = await client.get<MatchResponse>('/match');
    return result.data;
}

async function getMatch(tournamentId: string, team1: string, team2: string) {
    const result = await client.get(`/match/${tournamentId}/${team1}/${team2}`);
    return result.data;
}

async function getData(): Promise<GameData> {
    const result = await client.get<GameData>('/data');
    return result.data;
}

export default {
    getLatestMatch,
    getMatch,
    getData,
};
