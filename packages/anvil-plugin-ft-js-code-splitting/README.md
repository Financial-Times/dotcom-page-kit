# @financial-times/anvil-plugin-ft-js-code-splitting

This package extends the Anvil CLI build action (anvil build) with code splitting functionality in accordance with the [FT.com code splitting] strategy.

## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```
npm install --save-dev @financial-times/anvil-plugin-ft-js-code-splitting
```

After installing the package you must add it to the list of plugins in your project's `anvil.config.js` configuration file:

```js
const jsCodeSplitting = require('@financial-times/anvil-plugin-ft-js-code-splitting')

module.export = {
  plugins: [
    jsCodeSplitting.plugin()
  ]
}
```

[FT.com code splitting]: ../../docs/design-decisions/code-splitting-strategy.md
