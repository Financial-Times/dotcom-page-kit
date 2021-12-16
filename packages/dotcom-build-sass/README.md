# @financial-times/dotcom-build-sass

This package exports a Webpack plugin to configure it with a way to load and generate CSS files from [Sass] source code.

[Sass]: https://sass-lang.com/

## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/dotcom-build-sass
```

After installing the package you must add it to the list of plugins in your project's `webpack.config.js` configuration file:

```diff
+ const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass')

module.exports = {
  plugins: [
+    new PageKitSassPlugin()
  ]
}
```

Once setup, this plugin will enable you to use Sass files (`.scss` and `.sass`) as entry points into your source code.

```js
const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass')

module.exports = {
   entry: {
      styles: path/to/styles.scss
   },
   plugins: [new PageKitSassPlugin()]
}
```

## Scope

This plugin adds a [rule] to the Webpack configuration to handle `.scss` files. It first uses the [sass-loader] to transpile Sass source code, then sends the output through to the [postcss-loader] for optimisations, and finally the [css-loader]. The [mini-css-extract-plugin] is added to generate `.css` files and the [webpack-fix-style-only-entries] to clean up any empty JavaScript bundles.

Sass has been configured to find packages installed with npm by looking in the `'node_modules/@financial-times'` directories. It can be configured to look in additional locations by passing the relevant paths to the plugin as absolute paths.

```js
new PageKitSassPlugin({ includePaths: [path.resolve('./path-to-sass-files')] })
```

_Please note_ that by default Sass will resolve all bare `@import` statements from the current working directory rather than relative to the file being processed. This means it will not find dependencies in nested `node_modules` directories.

[PostCSS] is configured with the [Autoprefixer] and [cssnano] transforms.

The CSS loader has `@import` and `url()` resolution disabled as these should be handled by Sass.

[rule]: https://webpack.js.org/configuration/module/#rule
[sass-loader]: https://github.com/webpack-contrib/sass-loader
[postcss-loader]: https://github.com/postcss/postcss-loader
[css-loader]: https://github.com/webpack-contrib/css-loader
[mini-css-extract-plugin]: https://github.com/webpack-contrib/mini-css-extract-plugin
[webpack-fix-style-only-entries]: https://github.com/fqborges/webpack-fix-style-only-entries
[PostCSS]: https://postcss.org/
[Autoprefixer]: https://github.com/postcss/autoprefixer
[cssnano]: https://cssnano.co/


## Options

| Option            | Type     | Default | Description                                                        |
|-------------------|----------|---------|--------------------------------------------------------------------|
| `webpackImporter` | Boolean  | `false` | See https://github.com/webpack-contrib/sass-loader#webpackimporter |
| `prependData`     | String   | `''`    | See https://webpack.js.org/loaders/sass-loader/#prependdata        |
| `includePaths`    | String[] | `[]`    | See https://sass-lang.com/documentation/js-api#includepaths        |
