# @financial-times/dotcom-build-css

This package extends the [Page Kit CLI build action][cli] (`page-kit build`) with a way to load and generate CSS files.

[cli]: https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-page-kit-cli#build


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/dotcom-build-css
```

After installing the package you must add it to the list of plugins in your project's `page-kit.config.js` configuration file:

```diff
+ const css = require('@financial-times/dotcom-build-css')

module.exports = {
  plugins: [
+    css.plugin()
  ]
}
```

Once setup, this plugin will enable you to use CSS files as [entry points] into your source code.

```sh
page-kit build --entryFile path/to/styles.css
```

[entry points]: ../dotcom-page-kit-cli/readme.md#entry-points


## Scope

This plugin adds a [rule] to the Webpack configuration to handle `.css` files. It uses the [css-loader] to interpret `@import` rules and `url()` functions. The [mini-css-extract-plugin] is added to generate `.css` files and the [webpack-fix-style-only-entries] to clean up any empty JavaScript bundles left after CSS extraction.

Several [hooks](#hooks) are provided in order to access and modify the configuration.

[rule]: https://webpack.js.org/configuration/module/#rule
[css-loader]: https://github.com/webpack-contrib/css-loader
[mini-css-extract-plugin]: https://github.com/webpack-contrib/mini-css-extract-plugin
[webpack-fix-style-only-entries]: https://github.com/fqborges/webpack-fix-style-only-entries


## Options

There are currently no additional options for this plugin.


## Hooks

This plugin exposes the following hooks as extension points. They are available as constants on the exported `hooks` object.

```js
import { hooks } from '@financial-times/dotcom-build-css'
```

_Please note: The hooks below are listed in the order they will be executed._

### `WEBPACK_CSS_LOADER_OPTIONS`

Configuration options for the [css-loader].

### `WEBPACK_STYLES_ONLY_PLUGIN_OPTIONS`

Configuration options for the [webpack-fix-style-only-entries].

### `WEBPACK_MINI_CSS_EXTRACT_PLUGIN_OPTIONS`

Configuration options for the [mini-css-extract-plugin].

### `WEBPACK_CSS_RULE`

The Webpack [rule] for handling CSS files added by this plugin.

[rule]: https://webpack.js.org/configuration/module/#rule
