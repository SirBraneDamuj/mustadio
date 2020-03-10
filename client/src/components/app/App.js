import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';
import FftbgContext from '../../contexts/FftbgContext';
import Header from '../header/Header';
import Match from '../match/Match';
import mustadioApiClient from '../../api/mustadio-client';
import './App.css';

function App({
    tournamentId,
    team1,
    team2,
}) {
    const [currentMatch, setCurrentMatch] = useState({});
    const [matchReady, setMatchReady] = useState(false);
    const [data, setData] = useState({});
    const [dataReady, setDataReady] = useState(false);
    const [useDarkTheme, setUseDarkTheme] = useState(localStorage.getItem('darkTheme'));

    function toggleDarkTheme() {
        setUseDarkTheme(!useDarkTheme);
        localStorage.setItem('darkTheme', useDarkTheme);
    }

    useEffect(() => {
        async function fetchCurrentMatch() {
            setMatchReady(false);
            const matchResult = await mustadioApiClient.getMatch(tournamentId, team1, team2);
            setCurrentMatch(matchResult);
            setMatchReady(true);
        }
        fetchCurrentMatch();
    }, [tournamentId, team1, team2]);

    useEffect(() => {
        async function fetchData() {
            const dataResult = await mustadioApiClient.getData()
            setData(dataResult);
            setDataReady(true);
        }
        fetchData();
    }, []);

    const currentMap = (matchNumber, maps) => {
        return maps.sort(({ order1 }, { order2 }) => order1 - order2)[matchNumber]?.number;
    };

    const buildContext = () => ({
        match: currentMatch.match,
        tournament: currentMatch.tournament,
        data,
        currentMap: currentMap(currentMatch.match.matchNumber, currentMatch.tournament.maps),
    });

    const appClasses = classnames({
        'dark-theme': useDarkTheme,
    });

    if (matchReady && dataReady) {
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
            <Spinner animation="grow" />
        );
    }
}

export default App;
