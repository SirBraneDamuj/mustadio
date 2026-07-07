import { act, renderHook } from '@testing-library/react';
import { NOTABLE_STATUS, USER_NOTABLES_STORAGE_KEY, useUserNotables } from './useUserNotables';

beforeEach(() => {
    localStorage.clear();
});

test('defaults to no notable values', () => {
    const { result } = renderHook(() => useUserNotables());

    expect(result.current.notables).toEqual({});
    expect(result.current.isNotable('Angel Ring')).toBe(false);
});

test('reads stored notable values', () => {
    localStorage.setItem(USER_NOTABLES_STORAGE_KEY, JSON.stringify({ 'Angel Ring': NOTABLE_STATUS }));

    const { result } = renderHook(() => useUserNotables());

    expect(result.current.isNotable('Angel Ring')).toBe(true);
});

test('toggles a notable value on', () => {
    const { result } = renderHook(() => useUserNotables());

    act(() => result.current.toggleNotable('Angel Ring'));

    expect(result.current.isNotable('Angel Ring')).toBe(true);
    expect(JSON.parse(localStorage.getItem(USER_NOTABLES_STORAGE_KEY)!)).toEqual({ 'Angel Ring': NOTABLE_STATUS });
});

test('toggles a notable value off', () => {
    localStorage.setItem(USER_NOTABLES_STORAGE_KEY, JSON.stringify({ 'Angel Ring': NOTABLE_STATUS }));
    const { result } = renderHook(() => useUserNotables());

    act(() => result.current.toggleNotable('Angel Ring'));

    expect(result.current.isNotable('Angel Ring')).toBe(false);
    expect(JSON.parse(localStorage.getItem(USER_NOTABLES_STORAGE_KEY)!)).toEqual({});
});

test('ignores malformed storage values', () => {
    localStorage.setItem(USER_NOTABLES_STORAGE_KEY, 'not json');

    const { result } = renderHook(() => useUserNotables());

    expect(result.current.notables).toEqual({});
    expect(result.current.isNotable('Angel Ring')).toBe(false);
});
