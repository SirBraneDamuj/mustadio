/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';

// Polyfill ResizeObserver for Headless UI in jsdom
global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};
