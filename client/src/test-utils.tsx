import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FftbgContext from './contexts/FftbgContext';
import type { FftbgContextValue, Match, Tournament, GameDataResponse, MapInfo } from './schemas';

const mockMapInfo: MapInfo = {
    number: '001',
    title: 'Test Map',
    order: 1,
};

const mockTournament: Tournament = {
    tournamentId: 'test-tournament',
    maps: [mockMapInfo],
};

const mockMatch: Match = {
    team1: {
        name: 'Team1',
        units: [],
    },
    team2: {
        name: 'Team2',
        units: [],
    },
    matchNumber: 1,
};

const mockGameData: GameDataResponse = {
    items: {},
    abilities: {},
    classes: {},
    statuses: {},
    monsterSkills: {},
};

const defaultContextValue: FftbgContextValue = {
    match: mockMatch,
    tournament: mockTournament,
    data: mockGameData,
    currentMap: mockMapInfo,
    loadLatestMatch: () => {},
};

interface WrapperProps {
    children: React.ReactNode;
}

interface WrapperOptions {
    contextOverrides?: Partial<FftbgContextValue>;
    withRouter?: boolean;
}

export function createWrapper(options: WrapperOptions = {}) {
    const { contextOverrides = {}, withRouter = false } = options;
    const value = { ...defaultContextValue, ...contextOverrides };
    return function Wrapper({ children }: WrapperProps) {
        const content = (
            <FftbgContext.Provider value={value}>
                {children}
            </FftbgContext.Provider>
        );
        if (withRouter) {
            return <MemoryRouter>{content}</MemoryRouter>;
        }
        return content;
    };
}

export function renderWithContext(
    ui: React.ReactElement,
    contextOverrides: Partial<FftbgContextValue> = {},
    options?: Omit<RenderOptions, 'wrapper'>
) {
    return render(ui, {
        wrapper: createWrapper({ contextOverrides }),
        ...options,
    });
}

export function renderWithProviders(
    ui: React.ReactElement,
    wrapperOptions: WrapperOptions = {},
    renderOptions?: Omit<RenderOptions, 'wrapper'>
) {
    return render(ui, {
        wrapper: createWrapper(wrapperOptions),
        ...renderOptions,
    });
}

export { defaultContextValue, mockMatch, mockTournament, mockMapInfo, mockGameData };
