module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    // https://github.com/jest-community/eslint-plugin-jest
    'plugin:jest/recommended'
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
  },
  rules: {
  },
  overrides: [
  ]
}
