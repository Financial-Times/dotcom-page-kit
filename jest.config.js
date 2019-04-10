module.exports = {
  preset: 'ts-jest',
  roots: ['./packages'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/bower_components/', '/node_modules/']
}
