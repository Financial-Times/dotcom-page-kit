# Anvil Plugin CSS

This module extends the [Anvil CLI build action][cli] (`anvil build`) with a way to load and generate CSS files.

[cli]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil#build


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil-plugin-css
```

After installing the module you must add it to the list of plugins in your project's `anvil.config.json` configuration file:

```diff
{
  "plugins": [
+    "@financial-times/anvil-plugin-css"
  ]
}
```

Once setup, this plugin will enable you to use CSS files as [entry points] into your source code.

```sh
anvil build --entryFile path/to/styles.css
```

[entry points]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil#entry-points


## Scope

This plugin adds a [rule] to the Webpack configuration to handle `.css` files. It uses the [css-loader] to interpret `@import` rules. The [mini-css-extract-plugin] is added to generate `.css` files and the [webpack-fix-style-only-entries] to clean up any empty JavaScript bundles.

Several [hooks](#extending) are provided in order to access and modify the configuration.

[rule]: https://webpack.js.org/configuration/module/#rule
[css-loader]: https://github.com/webpack-contrib/css-loader
[mini-css-extract-plugin]: https://github.com/webpack-contrib/mini-css-extract-plugin
[webpack-fix-style-only-entries]: https://github.com/fqborges/webpack-fix-style-only-entries


## Settings

There are currently no additional settings for this plugin.


## Extending

_Please note: The hooks below are listed in the order they will be executed._

### `anvil::cli::@build::webpackConfig::cssPlugin::cssLoaderOptions`

A synchronous hook which receives the configuration object to be used for the [css-loader]. You may directly mutate this object.

### `anvil::cli::@build::webpackConfig::cssPlugin::rule`

A synchronous hook which receives the entire rule to be appended by this plugin. You may directly mutate this object.

### `anvil::cli::@build::webpackConfig::cssPlugin::stylesOnlyPluginOptions`

A synchronous hook which receives the configuration object to be used for the [webpack-fix-style-only-entries]. You may directly mutate this object.

### `anvil::cli::@build::webpackConfig::cssPlugin::cssExtractPluginOptions`

A synchronous hook which receives the configuration object to be used for the [mini-css-extract-plugin]. You may directly mutate this object.
