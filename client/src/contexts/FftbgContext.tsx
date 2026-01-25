import React from 'react';
import type { FftbgContextValue } from '../types';

const defaultValue: FftbgContextValue = {
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
  currentMap: undefined,
  loadLatestMatch: () => {},
};

const FftbgContext = React.createContext<FftbgContextValue>(defaultValue);

export default FftbgContext;
