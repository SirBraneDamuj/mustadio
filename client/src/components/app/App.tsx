import { useState, useEffect } from 'react';
import { Spinner } from '../ui';
import FftbgContext from '../../contexts/FftbgContext';
import Header from '../header/Header';
import Match from '../match/Match';
import mustadioApiClient from '../../api/mustadio-client';
import type { FullMatchResponse, GameDataResponse, MapInfo, FftbgContextValue } from '../../schemas';

interface AppProps {
    tournamentId: string;
    team1: string;
    team2: string;
}

function App({ tournamentId, team1, team2 }: AppProps) {
    const [currentMatch, setCurrentMatch] = useState<FullMatchResponse | null>(null);
    const [data, setData] = useState<GameDataResponse | null>(null);
    const [useDarkTheme, setUseDarkTheme] = useState(localStorage.getItem('darkTheme') === 'true');

    function toggleDarkTheme() {
        setUseDarkTheme(!useDarkTheme);
    }

    useEffect(() => {
        localStorage.setItem('darkTheme', String(useDarkTheme));
        if (useDarkTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [useDarkTheme])

    useEffect(() => {
        async function fetchCurrentMatch() {
            setCurrentMatch(null);
            const matchResult = await mustadioApiClient.getMatch(tournamentId, team1, team2);
            setCurrentMatch(matchResult);
        }
        fetchCurrentMatch();
    }, [tournamentId, team1, team2]);

    useEffect(() => {
        async function fetchData() {
            const dataResult = await mustadioApiClient.getData()
            setData(dataResult);
        }
        fetchData();
    }, []);

    const getCurrentMap = (matchNumber: number, maps: MapInfo[]): MapInfo => {
        const sortedMaps = [...maps].sort((a, b) => a.order - b.order);
        // Clamp to valid index range (handles championship/tournament over state)
        const index = Math.min(matchNumber, sortedMaps.length - 1);
        return sortedMaps[Math.max(0, index)] ?? { number: '1', title: 'Unknown', order: 0 };
    };

    const buildContext = (): FftbgContextValue => ({
        match: currentMatch!.match,
        tournament: currentMatch!.tournament,
        data: data!,
        currentMap: getCurrentMap(currentMatch!.match.matchNumber, currentMatch!.tournament.maps),
        loadLatestMatch: () => {},
    });

    const appClasses = useDarkTheme ? 'dark-theme' : '';

    if (currentMatch && data) {
        return (
            <FftbgContext.Provider value={buildContext()}>
                <div id='layout' className={appClasses}>
                    <Header useDarkTheme={useDarkTheme} handleDarkThemeToggle={toggleDarkTheme} />
                    <Match />
                </div>
            </FftbgContext.Provider>
        );
    } else {
        return (
            <div id='layout' className={`${appClasses} flex items-center justify-center min-h-screen`}>
                <Spinner variant={useDarkTheme ? 'light' : 'dark'} size="lg" />
            </div>
        );
    }
}

export default App;
