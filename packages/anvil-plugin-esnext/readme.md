# Anvil Plugin ESNext

This module extends the [Anvil CLI build action][cli] (`anvil build`) with a way to transpile modern JavaScript (ES2018) to a target of your choice.

[cli]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil#build


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil-plugin-esnext
```

After installing the module you must add it to the list of plugins in your project's `anvil.config.json` configuration file:

```diff
{
  "plugins": [
+    "@financial-times/anvil-plugin-esnext"
  ]
}
```

Once setup, this plugin will transform any JS [entry points] in your source code.

```sh
anvil build --entryFile path/to/entry.js
```

[entry points]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil#entry-points


## Scope

This plugin adds a [rule] to the Webpack configuration to handle `.js` and `.mjs` files and transform them using [Babel]. Babel has been configured with [preset-env] which allows you to use the latest JavaScript without needing to micromanage which syntax transforms are needed. Please note that polyfills will not be included for language features so we recommend using [polyfill.io] to deliver only the polyfills you need for your site.

Several [hooks](#extending) are provided in order to access and modify the configuration.

[rule]: https://webpack.js.org/configuration/module/#rule
[Babel]: https://babeljs.io/
[preset-env]: https://babeljs.io/docs/en/babel-preset-env
[polyfill.io]: https://polyfill.io/


## Settings

Settings for this plugin are provided by adding an `esnext` property to your `anvil.config.json` configuration file in the root of your project.

```diff
{
  "settings": {
+    "esnext": {}
  }
}
```

### `targets`

A [Browserslist] compatible query describing the targets for your project. Defaults to `"> 1%, ie 11, bb 10, ff ESR"`.

[Browserslist]: https://browserl.ist/


## Extending

_Please note: The hooks below are listed in the order they will be executed._

### `webpackConfig::esnextPlugin::presetEnvOptions`

A synchronous hook which receives the configuration object to be used for the [preset-env]. You may directly mutate this object.

### `webpackConfig::esnextPlugin::pluginTransformRuntimeOptions`

A synchronous hook which receives the configuration object to be used for the [plugin-transform-runtime] plugin. You may directly mutate this object.

[plugin-transform-runtime]: https://babeljs.io/docs/en/babel-plugin-transform-runtime

### `webpackConfig::esnextPlugin::babelLoaderOptions`

A synchronous hook which receives the entire configuration object to be used for the [babel-loader]. You may directly mutate this object.

[babel-loader]: https://github.com/babel/babel-loader

### `webpackConfig::esnextPlugin::rule`

A synchronous hook which receives the entire rule to be appended by this plugin. You may directly mutate this object.
