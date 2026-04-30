import React from 'react';
import { render } from '@testing-library/react';
import BraveFaith from './BraveFaith';

const mount = (brave: number, faith: number) => {
    return render(
        <BraveFaith brave={brave} faith={faith} />
    );
};

const isBold = (element: HTMLElement) => element.classList.contains('font-bold');

test('when neither is notable', () => {
    const { getByText } = mount(63, 58);
    expect(isBold(getByText('B: 63'))).toBe(false);
    expect(isBold(getByText('F: 58'))).toBe(false);
});

test('when only brave is notably high', () => {
    const { getByText } = mount(75, 58);
    expect(isBold(getByText('B: 75'))).toBe(true);
    expect(isBold(getByText('F: 58'))).toBe(false);
});

test('when only brave is notably low', () => {
    const { getByText } = mount(43, 58);
    expect(isBold(getByText('B: 43'))).toBe(true);
    expect(isBold(getByText('F: 58'))).toBe(false);
});

test('when only faith is notably high', () => {
    const { getByText } = mount(63, 75);
    expect(isBold(getByText('B: 63'))).toBe(false);
    expect(isBold(getByText('F: 75'))).toBe(true);
});

test('when only faith is notably low', () => {
    const { getByText } = mount(63, 44);
    expect(isBold(getByText('B: 63'))).toBe(false);
    expect(isBold(getByText('F: 44'))).toBe(true);
});

test('when both are notably high', () => {
    const { getByText } = mount(80, 71);
    expect(isBold(getByText('B: 80'))).toBe(true);
    expect(isBold(getByText('F: 71'))).toBe(true);
});

test('when both are notably low', () => {
    const { getByText } = mount(43, 35);
    expect(isBold(getByText('B: 43'))).toBe(true);
    expect(isBold(getByText('F: 35'))).toBe(true);
});

test('when one is notably low and one is notably high', () => {
    const { getByText } = mount(43, 83);
    expect(isBold(getByText('B: 43'))).toBe(true);
    expect(isBold(getByText('F: 83'))).toBe(true);
});