module.exports = {
  preset: 'ts-jest',
  roots: ['./packages'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['./jest.enzyme.ts'],
  // output snapshots to match pre-Jest-29 format
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true
  }
}
