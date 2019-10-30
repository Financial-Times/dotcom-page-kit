module.exports = {
  preset: 'ts-jest',
  roots: ['./packages'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/bower_components/', '/node_modules/'],
  setupFilesAfterEnv: ['./setupTests.ts'],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16'
  }
}
