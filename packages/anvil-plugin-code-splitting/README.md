# @financial-times/anvil-plugin-code-splitting

This plugin enables bundle splitting in accordance with the strategy outlined at https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758

## Installation

```
npm install --save-dev @financial-times/anvil-plugin-code-splitting
```

## Usage

anvil.config.js

```js
const codeSplittingPlugin = require('@financial-times/anvil-plugin-code-splitting').default

module.exports = {
  plugins: [
    codeSplittingPlugin
  ]
}
```
