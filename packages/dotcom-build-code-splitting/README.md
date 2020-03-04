# @financial-times/dotcom-build-code-splitting

This package extends the [Page Kit CLI build action][cli] (`page-kit build`) with code splitting functionality in accordance with the [FT.com code splitting] strategy.

[cli]: https://github.com/Financial-Times/dotcom-page-kit/tree/master/packages/dotcom-build-webpack-config#build
[FT.com code splitting]: ../../docs/design-decisions/code-splitting-strategy.md


## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```
npm install --save-dev @financial-times/dotcom-build-code-splitting
```

After installing the package you must add it to the list of plugins in your project's `page-kit.config.js` configuration file:

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


## Hooks

This plugin currently has no hooks to extend.
