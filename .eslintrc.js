const path = require('path')

module.exports = {
  parser: 'typescript-eslint-parser',
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    // https://github.com/jest-community/eslint-plugin-jest
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    // Support for ESM is not tied to an ES version
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.mjs']
      },
      webpack: {
        // Because we configure Storybook in "full control" mode we have to manually extend a
        // configuration object. Rather than mock that all here I've chosen to copy the resolve
        // rules over so they don't need to know about each other.
        config: {
          resolve: {
            modules: ['bower_components', 'node_modules'],
            descriptionFiles: ['bower.json', 'package.json'],
            mainFields: ['browser', 'module', 'main'],
            mainFiles: ['index', 'main']
          }
        }
      }
    }
  },
  rules: {
    'no-console': 'error',
    'import/no-unresolved': [2, { commonjs: true, caseSensitive: true }],
    'import/no-named-as-default': 0
  },
  overrides: []
}
