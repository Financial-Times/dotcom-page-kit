# @financial-times/dotcom-build-code-splitting

This package exports a Webpack plugin to configure it with code splitting functionality in accordance with the [FT.com code splitting] strategy.

[FT.com code splitting]: ../../docs/design-decisions/code-splitting-strategy.md

## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```
npm install --save-dev @financial-times/dotcom-build-code-splitting
```

After installing the package you must add it to the list of plugins in your project's `webpack.config.js` configuration file:

```diff
+ const codeSplitting = require('@financial-times/dotcom-build-code-splitting')

module.export = {
  plugins: [
+    codeSplitting.plugin()
  ]
}
```

Once setup, this plugin will automatically split your JavaScript code into several separate bundle files based upon the [FT.com code splitting] strategy.

## Options

There are currently no additional options for this plugin.
