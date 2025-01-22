# @financial-times/dotcom-build-css

This package exports a Webpack plugin to configure it with a way to load CSS source files.

## Getting started

This package is compatible with Node 18+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/dotcom-build-css
```

After installing the package you must add it to the list of plugins in your project's `webpack.config.js` configuration file:

```diff
+ const { PageKitCssPlugin } = require('@financial-times/dotcom-build-css')

module.exports = {
  plugins: [
+    new PageKitCssPlugin()
  ]
}
```

Once setup, this plugin will enable you to use CSS files (`.css`) as entry points into your source code.

```js
const { PageKitCssPlugin } = require('@financial-times/dotcom-build-css')

module.exports = {
   entry: {
      styles: path/to/styles.css
   },
   plugins: [new PageKitCssPlugin()]
}
```

## Scope

This plugin adds a [rule] to the Webpack configuration to handle `.css` files. It calls the [css-loader] package to load and parse the source files. The CSS is optimised using [css-minimizer-webpack-plugin], which runs [cssnano] under the hood. The [mini-css-extract-plugin] is added to generate `.css` files and the [webpack-fix-style-only-entries] to clean up any empty JavaScript bundles.

The CSS loader has `url()` resolution disabled as we don't use, nor recommend, the function currently.

[rule]: https://webpack.js.org/configuration/module/#rule
[css-loader]: https://github.com/webpack-contrib/css-loader
[css-minimizer-webpack-plugin]: https://github.com/webpack-contrib/css-minimizer-webpack-plugin
[mini-css-extract-plugin]: https://github.com/webpack-contrib/mini-css-extract-plugin
[webpack-fix-style-only-entries]: https://github.com/fqborges/webpack-fix-style-only-entries
[cssnano]: https://cssnano.co/
