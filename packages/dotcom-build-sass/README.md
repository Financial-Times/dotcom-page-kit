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

This plugin adds a [rule] to the Webpack configuration to handle `.scss` files. It first uses the [sass-loader] to transpile Sass source code. It will then process the CSS using the same logic as [@financial-times/dotcom-build-css]. So we'll first call [css-loader] to handle the native CSS files that have been generated. The CSS is optimised using [css-minimizer-webpack-plugin], which runs [cssnano] under the hood. The [mini-css-extract-plugin] is added to generate `.css` files and the [webpack-fix-style-only-entries] to clean up any empty JavaScript bundles.

Sass supports both relative paths and paths that can be resolved within your `node_modules`. It can be configured to look in additional locations by passing the relevant paths to the plugin as absolute paths.

```js
new PageKitSassPlugin({ includePaths: [path.resolve('./path-to-sass-files')] })
```

The CSS loader has `url()` resolution disabled as we don't use, nor recommend, the function currently.

[rule]: https://webpack.js.org/configuration/module/#rule
[@financial-times/dotcom-build-css]: ../dotcom-build-css
[sass-loader]: https://github.com/webpack-contrib/sass-loader
[css-loader]: https://github.com/webpack-contrib/css-loader
[css-minimizer-webpack-plugin]: https://github.com/webpack-contrib/css-minimizer-webpack-plugin
[mini-css-extract-plugin]: https://github.com/webpack-contrib/mini-css-extract-plugin
[webpack-fix-style-only-entries]: https://github.com/fqborges/webpack-fix-style-only-entries
[cssnano]: https://cssnano.co/


## Options

| Option            | Type     | Default | Description                                                        |
|-------------------|----------|---------|--------------------------------------------------------------------|
| `webpackImporter` | Boolean  | `false` | See https://github.com/webpack-contrib/sass-loader#webpackimporter |
| `additionalData`     | String   | `''`    | https://webpack.js.org/loaders/sass-loader/#additionaldata        |
| `includePaths`    | String[] | `[]`    | See https://sass-lang.com/documentation/js-api#includepaths        |
| `implementation`    | `sass\|sass-embedded` | `sass`    | See https://webpack.js.org/loaders/sass-loader/#implementation        |

## Sass build monitoring

Sass build times are stored locally and remotely, where your project sets relevant API keys. Alternatively, you may turn both these features off using environment variable.

- Local reporting: A running total of your local Sass build times are stored in a temporary file on your machine. This statistic is reported periodically for your interest, along with a prompt to support FT efforts to move away from Sass.
- Alongside this, your local Sass build times are sent to the [biz-ops metrics api](https://github.com/Financial-Times/biz-ops-metrics-api), provided the below environment variables are set.


| Environment Variable                       | Required   | Default    | Description                                                                                                                                                                                           |
|--------------------------------------------|------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `FT_SASS_STATS_NOTICE`                     | no         | `throttle` | How often to log Sass statistics out to terminal. One of `throttle`, `never`, `always`                                                                                                                |
| `FT_SASS_STATS_NOTICE_THROTTLE_SECONDS`    | no         | `1800`     | How many seconds to wait between logging Sass statistics out to terminal.                                                                                                                             |
| `FT_SASS_STATS_NOTICE_THROTTLE_PERCENTAGE` | no         | `30`       | A percentage increase in total Sass build time in which to log out statistics to the terminal regardless of time.                                                                                     |
| `FT_SASS_STATS_MONITOR`                    | no         | `off`      | Set to `on` to send Sass build time statistics to [biz-ops metrics api](https://github.com/Financial-Times/biz-ops-metrics-api) Requires `FT_SASS_BIZ_OPS_API_KEY` and `FT_SASS_BIZ_OPS_SYSTEM_CODE`. |
| `FT_SASS_BIZ_OPS_API_KEY`                  | no         | ``         | A [Biz-Ops Metrics API Key](https://github.com/Financial-Times/biz-ops-metrics-api/blob/main/docs/API_DEFINITION.md#authentication) for your system.                                                  |
| `FT_SASS_BIZ_OPS_SYSTEM_CODE`              | no         | ``         | The [biz-ops](https://biz-ops.in.ft.com/) system code of your project. Use `page-kit` if your system does not have a biz-ops code yet.                                                                |
