/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/scripts/**/*.test.ts',
  ],
};