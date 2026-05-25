import React from 'react';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnitBasic from './UnitBasic';
import { renderWithContext } from '../../test-utils';
import type { Team, Unit } from '../../schemas';

const baseStats = {
    hp: 173,
    mp: 47,
    move: 4,
    jump: 3,
    speed: 9,
    pa: 8,
    ma: 7,
    cEvPercent: 7,
    sPhysEvPercent: 0,
    sMagEvPercent: 0,
    aPhysEvPercent: 0,
    aMagEvPercent: 0,
};

const rawClassInfo = "Squire Male's base stats: 173 HP, 47 MP, 4 Move, 3 Jump, 9 Speed, 8 PA, 7 MA, 7% C-EV. Innate: Basic Skill.";

const unit: Unit = {
    name: 'TestUnit',
    gender: 'Male',
    zodiac: 'Aries',
    brave: 60,
    faith: 60,
    tournamentId: 'test-tournament',
    teamName: 'red',
    class: {
        name: 'Squire',
        gender: 'Male',
    },
    abilities: {},
    equipment: [],
    stats: baseStats,
};

const team: Team = {
    name: 'red',
    units: [unit],
};

test('shows class tooltip content from game data', async () => {
    const user = userEvent.setup();
    const { getByText, findByRole } = renderWithContext(
        <UnitBasic unit={unit} job="Squire" team={team} otherTeam={team} side="left" />,
        {
            data: {
                items: {},
                abilities: {},
                statuses: {},
                monsterSkills: {},
                classes: {
                    Squire: {
                        Male: {
                            name: 'Squire',
                            gender: 'Male',
                            raw: rawClassInfo,
                        },
                    },
                },
            },
        }
    );

    await act(async () => {
        await user.hover(getByText('Squire'));
    });

    expect(await findByRole('tooltip')).toHaveTextContent(rawClassInfo);
});
