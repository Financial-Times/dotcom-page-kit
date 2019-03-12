# @financial-times/anvil-plugin-ft-js-bundle-splitting

This module extends the Anvil CLI build action (anvil build) with bundle splitting functionality in accordance with the [FT.com bundle splitting] strategy.

## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```
npm install --save-dev @financial-times/anvil-plugin-ft-js-bundle-splitting
```

After installing the module you must add it to the list of plugins in your project's `anvil.config.js` configuration file:

```js
const jsBundleSplitting = require('@financial-times/anvil-plugin-ft-js-bundle-splitting')

module.export = {
  plugins: [
    jsBundleSplitting.plugin()
  ]
}
```

[FT.com bundle splitting]: ../../docs/design-decisions/bundle-splitting-strategy.md
