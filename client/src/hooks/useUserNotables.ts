import { useEffect, useState } from 'react';

export const USER_NOTABLES_STORAGE_KEY = 'mustadio.notables';
export const NOTABLE_STATUS = 'notable';

export type UserNotables = Record<string, string>;

type NotablesListener = (notables: UserNotables) => void;

const listeners = new Set<NotablesListener>();

function canUseLocalStorage() {
    return typeof localStorage !== 'undefined';
}

function parseUserNotables(value: string | null): UserNotables {
    if (!value) {
        return {};
    }

    try {
        const parsed = JSON.parse(value);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            return {};
        }

        return Object.fromEntries(
            Object.entries(parsed).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
        );
    } catch {
        return {};
    }
}

function readUserNotables(): UserNotables {
    if (!canUseLocalStorage()) {
        return {};
    }

    return parseUserNotables(localStorage.getItem(USER_NOTABLES_STORAGE_KEY));
}

function writeUserNotables(notables: UserNotables) {
    if (canUseLocalStorage()) {
        localStorage.setItem(USER_NOTABLES_STORAGE_KEY, JSON.stringify(notables));
    }
    listeners.forEach((listener) => listener(notables));
}

function subscribe(listener: NotablesListener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function useUserNotables() {
    const [notables, setNotables] = useState<UserNotables>(() => readUserNotables());

    useEffect(() => subscribe(setNotables), []);

    const getNotableStatus = (name: string) => notables[name];
    const isNotable = (name: string) => getNotableStatus(name) === NOTABLE_STATUS;
    const setNotableStatus = (name: string, status?: string) => {
        if (!name) {
            return;
        }

        const nextNotables = { ...readUserNotables() };
        if (status) {
            nextNotables[name] = status;
        } else {
            delete nextNotables[name];
        }
        writeUserNotables(nextNotables);
    };
    const toggleNotable = (name: string) => {
        setNotableStatus(name, isNotable(name) ? undefined : NOTABLE_STATUS);
    };

    return {
        notables,
        getNotableStatus,
        isNotable,
        setNotableStatus,
        toggleNotable,
    };
}
