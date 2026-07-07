import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnitActives from './UnitActives';
import { NOTABLE_STATUS, USER_NOTABLES_STORAGE_KEY } from '../../hooks/useUserNotables';
import { renderWithContext } from '../../test-utils';

const isBold = (element: HTMLElement) => element.classList.contains('font-bold');

beforeEach(() => {
    localStorage.clear();
});

test('learned abilities are not notable by default', () => {
    const { getByText } = renderWithContext(<UnitActives learned={['Phoenix Down']} side='left' />);

    expect(isBold(getByText('Phoenix Down').closest('button')!)).toBe(false);
});

test('stored learned abilities render bold', () => {
    localStorage.setItem(USER_NOTABLES_STORAGE_KEY, JSON.stringify({ 'Phoenix Down': NOTABLE_STATUS }));

    const { getByText } = renderWithContext(<UnitActives learned={['Phoenix Down']} side='left' />);

    expect(isBold(getByText('Phoenix Down').closest('button')!)).toBe(true);
});

test('clicking learned abilities toggles their notable status', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithContext(<UnitActives learned={['Phoenix Down']} side='left' />);

    await act(async () => {
        await user.click(getByText('Phoenix Down'));
    });

    expect(isBold(getByText('Phoenix Down').closest('button')!)).toBe(true);
    expect(JSON.parse(localStorage.getItem(USER_NOTABLES_STORAGE_KEY)!)).toEqual({ 'Phoenix Down': NOTABLE_STATUS });
});
