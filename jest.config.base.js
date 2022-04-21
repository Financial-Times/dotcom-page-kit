module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '.js': '@sucrase/jest-plugin'
  },
  transformIgnorePatterns: ['/packages/dotcom-ui-base-styles/node_modules/(?!(@financial-times/o-utils)/)']
}
