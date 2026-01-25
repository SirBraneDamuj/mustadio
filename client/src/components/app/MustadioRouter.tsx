import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import mustadioApiClient from '../../api/mustadio-client';
import App from './App';

function LatestMatch() {
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchCurrentMatch() {
            const { tournamentId, team1, team2 } = await mustadioApiClient.getLatestMatch();
            navigate(`/${tournamentId}/${team1}/${team2}`);
        }
        fetchCurrentMatch();
    }, [navigate]);
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
            <Routes>
                <Route path='/:tournamentId/:team1/:team2' element={<ConfiguredApp />} />
                <Route path='/' element={<LatestMatch />} />
            </Routes>
        </Router>
    );
}
