/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';

// Polyfill ResizeObserver for Headless UI in jsdom
globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};
