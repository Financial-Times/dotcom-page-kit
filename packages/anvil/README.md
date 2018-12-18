# Anvil CLI

This command line tool provides a suite of actions to assemble projects which use the Anvil toolset. The tool can be extended via plugins to provide additional functionality.


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil
```

Configuration can be passed to the Anvil CLI tool by providing a `anvil.config.json` file in your project root. Create this file now, including the fields defined below:

```json
{
  "plugins": [],
  "settings": {}
}
```

The `plugins` property can be used to provide a list of plugin package names. These plugins should be installed in your project as development dependencies. When executing the command line tool all of the plugins defined here will be loaded.

The `settings` property is used to provide configuration to the tool or plugins. Please check the individual plugin documentation for details about the configuration required.

To view the actions and global options provided by the tool, run the `anvil` command with the `--help` flag:

```sh
anvil --help
```


## Actions

### build

This action can be used to assemble the static assets for your application using Webpack. By default this action includes only a barebones Webpack configuration to bundle JavaScript source code but this can be extended via plugins to add additional functionality.

```sh
anvil build
```

#### Entry points

The path for the entry point into your source code can be provided via the `--srcFile` CLI flag or via the configuration file. The configuration file will take precedence over the CLI flag. The default entry point is `src/index.js`. Multiple entry points can only be defined using the configuration file. See the [Webpack entry documentation] for more information about entry points.

Usage via CLI tool flag:

```sh
anvil build --srcFile ./path/to/entry.js
```

Or via configuration file:

```json
{
  "settings": {
    "entry": {
      "main": "./path/to/entry.js"
    }
  }
}
```

[Webpack entry documentation]: https://webpack.js.org/concepts/entry-points/

#### Output directory

The generated output can be directed to a destination directory using the `--outDir` CLI flag. The default destination is `./dist/`.

```sh
anvil build --outDir ./path/to/dist/
```

Files will be stored using the pattern `[name].js` in development mode and `[name].[contenthash].js` in production mode.

#### Development and production mode

In production mode the output will be run through any configured optimisations, file names will be hashed, and full source maps will be generated. Production mode is the default.

To enable development mode you can use the `--devMode` CLI flag. This will disable several optimisations in favour of providing faster builds and rebuilds. See the [Webpack mode documentation] for further information about modes.

```sh
anvil build --devMode
```

[Webpack mode documentation]: https://webpack.js.org/concepts/mode/

#### Watch mode

The Anvil CLI tool can watch source files and trigger a rebuild whenever they change. To enable watch mode use the `--watch` CLI flag.

```sh
anvil build --watch
```
