import React from 'react';
import UnitStats from './UnitStats';
import { renderWithContext } from '../../test-utils';
import type { UnitStats as UnitStatsType, Side } from '../../schemas';

const defaultStats: UnitStatsType = {
    hp: 33,
    mp: 45,
    speed: 8,
    move: 5,
    jump: 3,
    pa: 8,
    ma: 9,
    cEvPercent: 12,
    sPhysEvPercent: 11,
    sMagEvPercent: 33,
    aPhysEvPercent: 14,
    aMagEvPercent: 99,
    initialStatuses: [
        'Protect',
    ],
    permStatuses: [
        'Haste',
    ],
};

const mount = (statsOverrides: Partial<UnitStatsType> = {}) => {
    const stats = { ...defaultStats, ...statsOverrides };
    return renderWithContext(
        <UnitStats
            side={'left' as Side}
            stats={stats}
        />
    );
};

test('does not render initial statuses when not present', () => {
    const { queryByText } = mount({
        initialStatuses: undefined,
    });
    expect(queryByText('Initial:')).toBeNull();
});

test('does not render initial statuses when empty', () => {
    const { queryByText } = mount({
        initialStatuses: [],
    });
    expect(queryByText('Initial:')).toBeNull();
});

test('does not render perm statuses when not present', () => {
    const { queryByText } = mount({
        permStatuses: undefined,
    });
    expect(queryByText('Permanent:')).toBeNull();
});

test('does not render perm statuses when empty', () => {
    const { queryByText } = mount({
        permStatuses: [],
    });
    expect(queryByText('Permanent:')).toBeNull();
});