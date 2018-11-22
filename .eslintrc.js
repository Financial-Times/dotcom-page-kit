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
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx', '.mjs']
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
