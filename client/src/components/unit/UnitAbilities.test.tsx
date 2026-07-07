import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnitAbilities from './UnitAbilities';
import { NOTABLE_STATUS, USER_NOTABLES_STORAGE_KEY } from '../../hooks/useUserNotables';
import { renderWithContext } from '../../test-utils';
import type { UnitAbilities as UnitAbilitiesType } from '../../schemas';

const unitAbilities: UnitAbilitiesType = {
    mainActive: { name: 'Throw', learned: [] },
    subActive: { name: 'Item', learned: [] },
    react: { name: 'Blade Grasp' },
    support: { name: 'Short Charge' },
    move: { name: 'Teleport 2' },
};

const contextOverrides = {
    data: {
        items: {},
        abilities: {},
        classes: {
            Ninja: {
                Male: {
                    name: 'Ninja',
                    gender: 'Male' as const,
                    innates: [{ name: 'Dual Wield', type: 'support' }],
                },
            },
        },
        statuses: {},
        monsterSkills: {},
    },
};

const isBold = (element: HTMLElement) => element.classList.contains('font-bold');

beforeEach(() => {
    localStorage.clear();
});

test('abilities are not notable by default', () => {
    const { getByText } = renderWithContext(
        <UnitAbilities abilities={unitAbilities} gender='Male' unitClass='Ninja' side='left' />,
        contextOverrides
    );

    expect(isBold(getByText('Short Charge').closest('button')!)).toBe(false);
    expect(isBold(getByText('Dual Wield').closest('button')!)).toBe(false);
});

test('stored abilities render bold', () => {
    localStorage.setItem(USER_NOTABLES_STORAGE_KEY, JSON.stringify({ 'Short Charge': NOTABLE_STATUS, 'Dual Wield': NOTABLE_STATUS }));

    const { getByText } = renderWithContext(
        <UnitAbilities abilities={unitAbilities} gender='Male' unitClass='Ninja' side='left' />,
        contextOverrides
    );

    expect(isBold(getByText('Short Charge').closest('button')!)).toBe(true);
    expect(isBold(getByText('Dual Wield').closest('button')!)).toBe(true);
});

test('clicking an ability toggles its notable status', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithContext(
        <UnitAbilities abilities={unitAbilities} gender='Male' unitClass='Ninja' side='left' />,
        contextOverrides
    );

    await act(async () => {
        await user.click(getByText('Short Charge'));
    });

    expect(isBold(getByText('Short Charge').closest('button')!)).toBe(true);
    expect(JSON.parse(localStorage.getItem(USER_NOTABLES_STORAGE_KEY)!)).toEqual({ 'Short Charge': NOTABLE_STATUS });
});

test('placeholder abilities do not create notable entries', async () => {
    const user = userEvent.setup();
    const emptyAbilities = {
        ...unitAbilities,
        support: { name: '' },
    };
    const { getByText } = renderWithContext(
        <UnitAbilities abilities={emptyAbilities} gender='Male' unitClass='Ninja' side='left' />,
        contextOverrides
    );

    await act(async () => {
        await user.click(getByText('(none)'));
    });

    expect(localStorage.getItem(USER_NOTABLES_STORAGE_KEY)).toBeNull();
});
