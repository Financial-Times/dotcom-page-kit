module.exports = {
  parser: '@typescript-eslint/parser',
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
        // configuration object. Rather than mock all that here I've chosen to copy the resolve
        // rules so that the two files do not need to know about one other and their structure.
        config: {
          resolve: {
            modules: ['node_modules'],
            descriptionFiles: ['package.json'],
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
