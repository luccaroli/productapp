import type {Config} from 'jest';

const config: Config = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.ts'],
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'json-summary'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!src/**/types.ts',
    '!src/**/types/*.ts',
    '!src/assets/*.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/**/styles.{ts,tsx}',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['__mocks__'],
};

export default config;
