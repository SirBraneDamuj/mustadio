import React from 'react';
import { render } from '@testing-library/react';
import UnitPortrait from './UnitPortrait';
import type { Gender, Side } from '../../schemas';

interface MountOverrides {
    job?: string;
    gender?: Gender;
    team?: string;
    side?: Side;
}

const defaults = {
    job: 'Squire',
    gender: 'Male' as Gender,
    team: 'red',
    side: 'left' as Side,
};

const mount = (overrides: MountOverrides = {}) => {
    return render(
        <UnitPortrait
            {...defaults}
            {...overrides}
        />
    )
};

test('when the side is left', async () => {
    const { container } = mount({ side: 'left' });
    const el = container.firstChild as Element;
    expect(el.classList.contains('unit-portrait-left')).toBe(true);
    expect(el.classList.contains('unit-portrait-right')).toBe(false);
});

test('when the side is right', async () => {
    const { container } = mount({ side: 'right' });
    const el = container.firstChild as Element;
    expect(el.classList.contains('unit-portrait-left')).toBe(false);
    expect(el.classList.contains('unit-portrait-right')).toBe(true);
});

test('does not specify a team color when the team is champion', () => {
    const { container } = mount({ team: 'champion' });
    const el = container.firstChild as Element;
    expect(el.getAttribute('src')).toMatch(/\/units\/SquireM\.gif$/);
});

test('uses the team color in the img url when the team is not champion', () => {
    const { container } = mount({ team: 'blue' });
    const el = container.firstChild as Element;
    expect(el.getAttribute('src')).toMatch(/\/units\/SquireM_Blue\.gif$/);
});

test('does not use gender or color when the job is a monster job', () => {
    const { container } = mount({ gender: 'Monster', job: 'Tiamat' });
    const el = container.firstChild as Element;
    expect(el.getAttribute('src')).toMatch(/\/units\/Tiamat\.gif$/);
});