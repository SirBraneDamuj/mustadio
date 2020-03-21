import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import App from './App';

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
                    <ConfiguredApp />
                </Route>
            </Switch>
        </Router>
    );
}