# @financial-times/anvil-plugin-ft-js

## Installation

```
npm install --save-dev @financial-times/anvil-plugin-ft-js
```

## Usage

anvil.config.js

```js
const ftJsPlugin = require('@financial-times/anvil-plugin-ft-js').default

module.export = {
  plugins: [
    ftJsPlugin({ ...options })
  ]
}
```

## Options

- **jsxPragma**: (Defaults to `h`) See https://babeljs.io/docs/en/babel-preset-react#pragma
- **jsxPragmaFrag**: (Defaults to `Fragment`) See https://babeljs.io/docs/en/babel-preset-react#pragmafrag
