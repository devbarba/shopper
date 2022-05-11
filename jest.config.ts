export default {
    testEnvironment: 'node',
    testTimeout: 20000,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**'],
    modulePathIgnorePatterns: [
        'dist',
        'src/index.ts',
        'src/interfaces',
        'src/__tests__/__mocks__'
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
            lines: 80,
        },
    },
};
