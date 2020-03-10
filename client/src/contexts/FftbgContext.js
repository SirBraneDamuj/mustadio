import React from 'react';

const FftbgContext = React.createContext({
  match: {
    team1: {
      name: '',
      units: [],
    },
    team2: {
      name: '',
      units: [],
    },
    matchNumber: 0,
  },
  tournament: {
    tournamentId: '',
    maps: [],
  },
  data: {
    items: {},
    abilities: {},
    classes: {},
    statuses: {},
    monsterSkills: {},
  },
});

export default FftbgContext;