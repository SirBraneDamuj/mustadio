import React from 'react';
import { render } from '@testing-library/react';
import BraveFaith from './BraveFaith';


const mount = (brave, faith) => {
    return render(
        <BraveFaith brave={brave} faith={faith} />
    );
};

test('when neither is notable', () => {
    const { getByText } = mount(63, 58);
    expect(getByText('B: 63').classList.contains('notable')).toBe(false);
    expect(getByText('F: 58').classList.contains('notable')).toBe(false);
});

test('when only brave is notably high', () => {
    const { getByText } = mount(75, 58);
    expect(getByText('B: 75').classList.contains('notable')).toBe(true);
    expect(getByText('F: 58').classList.contains('notable')).toBe(false);
});

test('when only brave is notably low', () => {
    const { getByText } = mount(43, 58);
    expect(getByText('B: 43').classList.contains('notable')).toBe(true);
    expect(getByText('F: 58').classList.contains('notable')).toBe(false);
});

test('when only faith is notably high', () => {
    const { getByText } = mount(63, 75);
    expect(getByText('B: 63').classList.contains('notable')).toBe(false);
    expect(getByText('F: 75').classList.contains('notable')).toBe(true);
});

test('when only brave is notably low', () => {
    const { getByText } = mount(63, 44);
    expect(getByText('B: 63').classList.contains('notable')).toBe(false);
    expect(getByText('F: 44').classList.contains('notable')).toBe(true);
});

test('when both are notably high', () => {
    const { getByText } = mount(80, 71);
    expect(getByText('B: 80').classList.contains('notable')).toBe(true);
    expect(getByText('F: 71').classList.contains('notable')).toBe(true);
});

test('when both are notably low', () => {
    const { getByText } = mount(43, 35);
    expect(getByText('B: 43').classList.contains('notable')).toBe(true);
    expect(getByText('F: 35').classList.contains('notable')).toBe(true);
});

test('when one is notably low and one is notably high', () => {
    const { getByText } = mount(43, 83);
    expect(getByText('B: 43').classList.contains('notable')).toBe(true);
    expect(getByText('F: 83').classList.contains('notable')).toBe(true);
});