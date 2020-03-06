# @financial-times/dotcom-build-webpack-config

This package generates a [Webpack](https://webpack.org) configuration for apps to use to build client-side assets to Page Kit conventions.

## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/dotcom-build-webpack-config
```

This package provides a function, `getWebpackConfig`, which can be configured with [options](#options), and should be used in a `webpack.config.js` file.

```js
const { getWebpackConfig } = require('@financial-times/dotcom-build-webpack-config');

module.exports = getWebpackConfig(userConfig, plugins);
```

`userConfig` is a [Webpack configuration object](https://webpack.js.org/configuration/) to extend with Page Kit-specific options. It should include at least the [`entry` option](#entry-points).

The `plugins` argument is used to provide [`dotcom-page-kit-pluggable`](../dotcom-page-kit-pluggable/README.md) plugins for modifying the generated Webpack configuration. These plugins should be installed in your project as development dependencies. Plugins by convention are namespaced with `dotcom-build-`.

## Usage with Webpack

This package includes a base Webpack configuration to do:

- Basic Javascript compilation and bundling
- [Brotli and gzip compression](https://webpack.js.org/plugins/compression-webpack-plugin/) of output files
- Generating a [manifest of the output files](https://github.com/danethurber/webpack-manifest-plugin) for other tools such as [`dotcom-server-asset-loader`](../dotcom-server-asset-loader/README.md) to consume
- [Cleaning up out-of-date output files](https://github.com/johnagan/clean-webpack-plugin)

### Development and production modes

In production mode the generated output will be optimised, file names hashed, and full source maps, gzip and brotli compressed assets generated. Production mode is the default.

To enable development mode you can use the `--mode` Webpack flag. This will disable several optimisations in favour of providing faster builds and rebuilds. See the [Webpack mode documentation] for further information about modes.

```sh
webpack --mode=development
```

[Webpack mode documentation]: https://webpack.js.org/concepts/mode/

##### Watch mode

For convenience the build action can watch source files and trigger a rebuild whenever they change. To enable watch mode use the `--watch` CLI flag.

```sh
webpack --watch
```

## Hooks

This plugin exposes the following hooks as extension points. They are available as constants on the exported `hooks` object.

```js
import { hooks } from '@financial-times/dotcom-build-webpack-config'
```

_Please note: The hooks below are listed in the order they will be executed._

##### `WEBPACK_CLEAN_PLUGIN_OPTIONS`

Configuration options for the [clean plugin](https://github.com/johnagan/clean-webpack-plugin).

##### `WEBPACK_GZIP_COMPRESSION_PLUGIN_OPTIONS`

Configuration options for the [compression plugin](https://github.com/webpack-contrib/compression-webpack-plugin) set to use the gzip algorithm.

##### `WEBPACK_BROTLI_COMPRESSION_PLUGIN_OPTIONS`

Configuration options for the [compression plugin](https://github.com/webpack-contrib/compression-webpack-plugin) set to use the Brotli algorithm.

##### `WEBPACK_MANIFEST_PLUGIN_OPTIONS`

Configuration options for the [assets manifest plugin](https://github.com/webdeveric/webpack-assets-manifest) which provides the compilation entrypoints for each bundle by asset type e.g. `scripts` and `styles`.

##### `BABEL_CONFIG`

Configuration options for [Babel](https://babeljs.io/docs/en/options).

##### `BABEL_PRESET_ENV_OPTIONS`

Configuration options for [Babel Preset Env](https://babeljs.io/docs/en/babel-preset-env#options).

##### `WEBPACK_JS_RULE`

The Webpack [rule] for handling JavaScript files.

[rule]: https://webpack.js.org/configuration/module/#rule

##### `WEBPACK_CONFIG`

The complete Webpack configuration object.
