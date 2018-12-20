# Anvil Plugin CSS

This module provides a plugin which extends the [Anvil CLI build action][cli] to provide the capability to load and generate CSS files.

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

Once setup this plugin will enable you to use CSS files as [entry points] into your source code.

```sh
anvil build --srcFile path/to/styles.css
```

[entry points]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil#entry-points


## Settings

There are currently no additional settings for this plugin.


## Extending

This plugin uses the [css-loader] and [mini-css-extract-plugin] modules to interpret `@import` rules and generate `.css` files. Several hooks are provided in order to access and modify their configuration.

_Please note: The hooks below are listed in the order they will be executed._

### `webpackConfig::cssPlugin::cssLoaderOptions`

A synchronous hook which receives the configuration object to be used for the [css-loader]. You may directly mutate this object.

### `webpackConfig::cssPlugin::miniCssExtractPluginOptions`

A synchronous hook which receives the configuration object to be used for the [mini-css-extract-plugin]. You may directly mutate this object.

### `webpackConfig::cssPlugin`

A synchronous hook which receives the entire [rule] to be appended by this plugin. You may directly mutate this object.

[rule]: https://webpack.js.org/configuration/module/#rule
[css-loader]: https://github.com/webpack-contrib/css-loader
[mini-css-extract-plugin]: https://github.com/webpack-contrib/mini-css-extract-plugin
