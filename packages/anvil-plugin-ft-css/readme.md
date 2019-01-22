# Anvil Plugin FT CSS

This module extends the [Anvil CLI build action][cli] (`anvil build`) with a way to generate optimised CSS files from [Sass] source code for FT.com.

[cli]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil#build
[Sass]: https://sass-lang.com/

## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil-plugin-ft-css
```

After installing the module you must add it to the list of plugins in your project's `anvil.config.json` configuration file:

```diff
{
  "plugins": [
+    "@financial-times/anvil-plugin-ft-css"
  ]
}
```

Once setup, this plugin will enable you to use Sass files as [entry points] into your source code.

```sh
anvil build --entryFile path/to/styles.scss
```

[entry points]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil#entry-points


## Scope

This plugin adds a [rule] to the Webpack configuration to handle `.scss` files. It first uses the [sass-loader] to transpile Sass source code, then sends the output through to the [postcss-loader] for optimisations, and finally the [css-loader]. The [mini-css-extract-plugin] is added to generate `.css` files and the [webpack-fix-style-only-entries] to clean up any empty JavaScript bundles.

Sass has been configured to find packages installed with Bower and or npm from the `@financial-times` organisation.

[PostCSS] is configured with the [Autoprefixer] and [cssnano] tranforms.

The CSS loader has `@import` and `url()` resolution disabled as these should be handled by Sass.

Several [hooks](#extending) are provided in order to access and modify the configuration.

[rule]: https://webpack.js.org/configuration/module/#rule
[sass-loader]: https://github.com/webpack-contrib/sass-loader
[postcss-loader]: https://github.com/postcss/postcss-loader
[css-loader]: https://github.com/webpack-contrib/css-loader
[mini-css-extract-plugin]: https://github.com/webpack-contrib/mini-css-extract-plugin
[webpack-fix-style-only-entries]: https://github.com/fqborges/webpack-fix-style-only-entries
[PostCSS]: https://postcss.org/
[Autoprefixer]: https://github.com/postcss/autoprefixer
[cssnano]: https://cssnano.co/


## Settings

There are currently no additional settings for this plugin.


## Extending

_Please note: The hooks below are listed in the order they will be executed._

### `anvil::cli::@build::webpackConfig::ftCssPlugin::sassLoaderOptions`

A synchronous hook which receives the configuration object to be used for the [sass-loader]. You may directly mutate this object.

### `anvil::cli::@build::webpackConfig::ftCssPlugin::autoprefixerOptions`

A synchronous hook which receives the configuration object to be used for the [Autoprefixer] PostCSS plugin. You may directly mutate this object.

### `anvil::cli::@build::webpackConfig::ftCssPlugin::cssnanoOptions`

A synchronous hook which receives the configuration object to be used for the [cssnano] PostCSS plugin. You may directly mutate this object.

### `anvil::cli::@build::webpackConfig::ftCssPlugin::postcssLoaderOptions`

A synchronous hook which receives the configuration object to be used for the [postcss-loader]. You may directly mutate this object.

### `anvil::cli::@build::webpackConfig::ftCssPlugin::cssLoaderOptions`

A synchronous hook which receives the configuration object to be used for the [css-loader]. You may directly mutate this object.

### `anvil::cli::@build::webpackConfig::ftCssPlugin::rule`

A synchronous hook which receives the entire [rule] to be appended by this plugin. You may directly mutate this object.

### `anvil::cli::@build::webpackConfig::ftCssPlugin::stylesOnlyPluginOptions`

A synchronous hook which receives the configuration object to be used for the [webpack-fix-style-only-entries]. You may directly mutate this object.

### `anvil::cli::@build::webpackConfig::ftCssPlugin::cssExtractPluginOptions`

A synchronous hook which receives the configuration object to be used for the [mini-css-extract-plugin]. You may directly mutate this object.
