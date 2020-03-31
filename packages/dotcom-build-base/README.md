# @financial-times/dotcom-build-base

This package exports a Webpack plugin to configure it with the ability to build client-side assets to Page Kit conventions.

## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/dotcom-build-base
```

After installing the module you must add it to the list of plugins in your project's `webpack.config.js` configuration file:

```js
const pageKitWebpack = require('@financial-times/dotcom-build-base');

module.exports = {
	plugins: [
		pageKitWebpack.plugin()
	]
}
```

This package enhances your Webpack config to do:

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
