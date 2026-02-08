import { useState, useEffect } from 'react';
import classnames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';
import FftbgContext from '../../contexts/FftbgContext';
import Header from '../header/Header';
import Match from '../match/Match';
import mustadioApiClient from '../../api/mustadio-client';
import type { FullMatchResponse, GameDataResponse, MapInfo, FftbgContextValue } from '../../schemas';
import './App.css';

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
        return [...maps].sort((a, b) => a.order - b.order)[matchNumber];
    };

    const buildContext = (): FftbgContextValue => ({
        match: currentMatch!.match,
        tournament: currentMatch!.tournament,
        data: data!,
        currentMap: getCurrentMap(currentMatch!.match.matchNumber, currentMatch!.tournament.maps),
        loadLatestMatch: () => {},
    });

    const appClasses = classnames({
        'dark-theme': useDarkTheme,
    });

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
            <div id='layout' className={appClasses}>
                <Spinner animation="grow" variant={useDarkTheme ? 'light' : 'dark'}/>
            </div>
        );
    }
}

export default App;
