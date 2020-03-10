import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FftbgContext from '../../contexts/FftbgContext';
import Header from '../header/Header';
import Match from '../match/Match';

const mustadioApiClient = axios.create({
  baseURL: 'http://localhost:3001/api'
});

function App() {
  const [currentMatch, setCurrentMatch] = useState({});
  const [matchReady, setMatchReady] = useState(false);
  const [data, setData] = useState({});
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    async function fetchCurrentMatch() {
      const matchResult = await mustadioApiClient.get('/match');
      setCurrentMatch(matchResult.data);
      setMatchReady(true);
    }
    fetchCurrentMatch();
  }, [setCurrentMatch]);

  useEffect(() => {
    async function fetchData() {
      const dataResult = await mustadioApiClient.get('/data');
      setData(dataResult.data);
      setDataReady(true);
    }
    fetchData();
  }, [setData]);

  const buildContext = () => ({
    match: currentMatch.match,
    tournament: currentMatch.tournament,
    data, 
  });
  if (matchReady && dataReady) {
    return (
      <div>
        <FftbgContext.Provider value={buildContext()}>
          <Header />
          <div className='p-3'>
            <Match />
          </div>
        </FftbgContext.Provider>
      </div>
    );
  } else {
    return null;
  }
}

export default App;
