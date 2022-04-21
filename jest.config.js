const base = require('./jest.config.base.js')

module.exports = {
  ...base,
  roots: ['./packages'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./jest.enzyme.ts'],
  testPathIgnorePatterns: ['/node_modules/']
}
