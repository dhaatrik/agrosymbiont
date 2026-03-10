import '@testing-library/jest-dom';

// Mock window.scrollTo to prevent Not implemented error in tests
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
