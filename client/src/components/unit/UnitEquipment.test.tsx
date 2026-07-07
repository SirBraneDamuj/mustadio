import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnitEquipment from './UnitEquipment';
import { NOTABLE_STATUS, USER_NOTABLES_STORAGE_KEY } from '../../hooks/useUserNotables';
import { renderWithContext } from '../../test-utils';

const isBold = (element: HTMLElement) => element.classList.contains('font-bold');

beforeEach(() => {
    localStorage.clear();
});

test('equipment is not notable by default', () => {
    const { getByText } = renderWithContext(
        <UnitEquipment equipmentList={[{ name: 'Angel Ring' }]} side='left' />,
        {
            data: {
                items: { 'Angel Ring': { name: 'Angel Ring', slot: 'accessory' } },
                abilities: {},
                classes: {},
                statuses: {},
                monsterSkills: {},
            },
        }
    );

    expect(isBold(getByText('Angel Ring').closest('button')!)).toBe(false);
});

test('equipment stored as notable renders bold', () => {
    localStorage.setItem(USER_NOTABLES_STORAGE_KEY, JSON.stringify({ 'Angel Ring': NOTABLE_STATUS }));

    const { getByText } = renderWithContext(
        <UnitEquipment equipmentList={[{ name: 'Angel Ring' }]} side='left' />,
        {
            data: {
                items: { 'Angel Ring': { name: 'Angel Ring', slot: 'accessory' } },
                abilities: {},
                classes: {},
                statuses: {},
                monsterSkills: {},
            },
        }
    );

    expect(isBold(getByText('Angel Ring').closest('button')!)).toBe(true);
});

test('clicking equipment toggles its notable status', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithContext(
        <UnitEquipment equipmentList={[{ name: 'Angel Ring' }]} side='left' />,
        {
            data: {
                items: { 'Angel Ring': { name: 'Angel Ring', slot: 'accessory' } },
                abilities: {},
                classes: {},
                statuses: {},
                monsterSkills: {},
            },
        }
    );

    await act(async () => {
        await user.click(getByText('Angel Ring'));
    });

    expect(isBold(getByText('Angel Ring').closest('button')!)).toBe(true);
    expect(JSON.parse(localStorage.getItem(USER_NOTABLES_STORAGE_KEY)!)).toEqual({ 'Angel Ring': NOTABLE_STATUS });
});
