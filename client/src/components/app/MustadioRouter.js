import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import mustadioApiClient from '../../api/mustadio-client';
import App from './App';

function LatestMatch() {
    const history = useHistory();
    useEffect(() => {
        async function fetchCurrentMatch() {
            const { tournamentId, team1, team2 } = await mustadioApiClient.getLatestMatch();
            history.push(`/${tournamentId}/${team1}/${team2}`);
        }
        fetchCurrentMatch();
    }, [history]);
    return (
        <Spinner animation="grow" />
    );
}

function ConfiguredApp() {
    const { tournamentId, team1, team2 } = useParams();
    return (
        <App tournamentId={tournamentId} team1={team1} team2={team2} />
    );
}

export default function MustadioRouter() {
    return (
        <Router>
            <Switch>
                <Route path='/:tournamentId/:team1/:team2'>
                    <ConfiguredApp />
                </Route>
                <Route path='/'>
                    <LatestMatch />
                </Route>
            </Switch>
        </Router>
    );
}