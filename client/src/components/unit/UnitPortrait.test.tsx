import React from 'react';
import { render } from '@testing-library/react';
import UnitPortrait from './UnitPortrait';

const defaults = {
    job: 'Squire',
    gender: 'Male',
    team: 'red',
    side: 'left',
};

const mount = (overrides) => {
    return render(
        <UnitPortrait
            {...defaults}
            {...overrides}
        />
    )
};

test('when the side is left', async () => {
    const { container } = mount({ side: 'left' });
    expect(container.firstChild.classList.contains('unit-portrait-left')).toBe(true);
    expect(container.firstChild.classList.contains('unit-portrait-right')).toBe(false);
});

test('when the side is right', async () => {
    const { container } = mount({ side: 'right' });
    expect(container.firstChild.classList.contains('unit-portrait-left')).toBe(false);
    expect(container.firstChild.classList.contains('unit-portrait-right')).toBe(true);
});

test('does not specify a team color when the team is champion', () => {
    const { container } = mount({ team: 'champion' });
    expect(container.firstChild.getAttribute('src')).toMatch(/\/units\/SquireM\.gif$/);
});

test('uses the team color in the img url when the team is not champion', () => {
    const { container } = mount({ team: 'blue' });
    expect(container.firstChild.getAttribute('src')).toMatch(/\/units\/SquireM_Blue\.gif$/);
});

test('does not use gender or color when the job is a monster job', () => {
    const { container } = mount({ gender: 'Monster', job: 'Tiamat' });
    expect(container.firstChild.getAttribute('src')).toMatch(/\/units\/Tiamat\.gif$/);
})