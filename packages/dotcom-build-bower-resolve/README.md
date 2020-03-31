# @financial-times/dotcom-build-bower-resolve

This package exports a Webpack plugin to configure it with a way to find and load dependencies installed with [Bower].

[Bower]: https://bower.io/

## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/dotcom-build-bower-resolve
```

After installing the package you must add it to the list of plugins in your project's `webpack.config.js` configuration file:

```diff
+ const { PageKitBowerResolve } = require('@financial-times/dotcom-build-bower-resolve')

module.exports {
  "plugins": [
+    new PageKitBowerResolve()
  ]
}
```

Once setup, this plugin will enable you to use Bower dependencies in your source code.

## Scope

This plugin adds several properties to Webpack's [resolve configuration] instructing it to look for modules within the `bower_components` directory and use the `bower.json` manifest file if present.

This plugin also adds the [bower-resolve-webpack-plugin].

_Please note that Bower dependencies will be favoured over dependencies installed with npm._

[resolve configuration]: https://webpack.js.org/configuration/resolve/
[bower-resolve-webpack-plugin]: https://www.npmjs.com/package/bower-resolve-webpack-plugin

## Options

There are currently no additional options for this plugin.
