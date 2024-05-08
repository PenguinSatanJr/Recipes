import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  setupFilesAfterEnv: ['./src/jest-setup.ts'],
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/migration/*.{ts,tsx}'],
  modulePathIgnorePatterns: ['./build/'],
};

export default config;
