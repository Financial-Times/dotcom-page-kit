# @financial-times/anvil-cli

This Anvil CLI provides a suite of actions to assemble modern Web projects. The CLI can be extended via plugins to provide additional functionality.


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil
```

Configuration is provided to the CLI by a `anvil.config.js` file placed in your project root (next to `package.json`). Create this file now, including the fields defined below:

```js
module.exports = {
  plugins: [],
  settings: {}
}
```

The `plugins` property is used to supply the plugins that should be loaded by the anvil CLI. These plugins should be installed in your project as development dependencies. Plugins by convention have names matching the CLI action, e.g. `anvil-build-`.

The `settings` property is used to provide specific configuration for the individual CLI actions. These settings are covered below (see [actions](#actions).)

To view the available actions and global options provided by the CLI, run the `anvil` command with the `--help` flag:

```sh
anvil --help
```


## Actions

### `build`

This action can be used to assemble the static assets for your application using Webpack. By default this action includes only a barebones Webpack configuration to bundle JavaScript source code but this can be extended via plugins to add additional functionality.

#### Options

##### Entry points

The path for the entry point into your source code can be provided via the `--entryFile` CLI flag or via the configuration file. The default entry point is `"src/index.js"`. Multiple entry points can only be defined using the configuration file. See the [Webpack entry documentation] for more information about entry points. The configuration file will take precedence over the CLI flag.

[Webpack entry documentation]: https://webpack.js.org/concepts/entry-points/

Usage via CLI flag:

```sh
anvil build --entryFile ./path/to/entry.js
```

Usage via configuration file:

```js
module.exports = {
  plugins: [...],
  settings: {
    build: {
      entry: {
        main: './path/to/entry.js'
      }
    }
  }
}
```

##### Output path

The generated output can be directed to a destination directory using the `--outputPath` CLI flag or via the configuration file. The default destination is `"./dist"`. The configuration file will take precedence over the CLI flag.

Usage via CLI flag:

```sh
anvil build --outputPath ./path/to/dist
```

Usage via configuration file:

```js
module.exports = {
  plugins: [...],
  settings: {
    build: {
      outputPath: './path/to/dist'
    }
  }
}
```

Files will be created using the pattern `[name].js` in development mode and `[name].[contenthash].js` in production mode.

##### Manifest file name

The name of the generated manifest file can be changed via the configuration file. The default file name is `"manifest.json"`.

Usage via configuration file:

```js
module.exports = {
  plugins: [...],
  settings: {
    build: {
      manifestFileName: 'asset-hashes.json'
    }
  }
}
```

##### Targets

A [browserslist-compatible] query that describes the environments you support / target for your project. It defaults to: `last 2 Chrome versions, ie 11, Safari >= 9.1, ff ESR, last 2 Edge versions`.

Usage via configuration file:

```js
module.exports = {
  plugins: [...],
  settings: {
    build: {
      targets: {
        chrome: '58',
        ie: '11'
      }
    }
  }
}
```

[browserslist-compatible]: https://github.com/browserslist/browserslist

##### Development and production modes

In production mode the generated output will be optimised, file names hashed, and full source maps generated. Production mode is the default.

To enable development mode you can use the `--development` CLI flag. This will disable several optimisations in favour of providing faster builds and rebuilds. See the [Webpack mode documentation] for further information about modes.

```sh
anvil build --development
```

[Webpack mode documentation]: https://webpack.js.org/concepts/mode/

##### Watch mode

For convenience the build action can watch source files and trigger a rebuild whenever they change. To enable watch mode use the `--watch` CLI flag.

```sh
anvil build --watch
```


## Hooks

This plugin exposes the following hooks as extension points. They are available as constants on the exported `hooks` object.

```js
import { hooks } from '@financial-times/anvil-cli'
```

_Please note: The hooks below are listed in the order they will be executed._

##### `WEBPACK_MANIFEST_PLUGIN_OPTIONS`

Configuration options for the [assets manifest plugin](https://github.com/webdeveric/webpack-assets-manifest).

##### `WEBPACK_CLEAN_PLUGIN_OPTIONS`

Configuration options for the [clean plugin](https://github.com/johnagan/clean-webpack-plugin).

##### `BABEL_CONFIG`

Configuration options for [Babel](https://babeljs.io/docs/en/options).

##### `BABEL_PRESET_ENV_OPTIONS`

Configuration options for [Babel Preset Env](https://babeljs.io/docs/en/babel-preset-env#options).

##### `WEBPACK_JS_RULE`

The Webpack [rule] for handling JavaScript files.

[rule]: https://webpack.js.org/configuration/module/#rule

##### `WEBPACK_CONFIG`

The complete Webpack configuration object.
