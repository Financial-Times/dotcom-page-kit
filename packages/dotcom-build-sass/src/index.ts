import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts'
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin'
import type webpack from 'webpack'

export type TPluginOptions = {
  includePaths?: string[]
  additionalData?: string
  webpackImporter?: boolean
  implementation?: 'sass' | 'sass-embedded'
}

export class PageKitSassPlugin {
  includePaths: string[]
  additionalData: string
  webpackImporter: boolean
  implementation: 'sass' | 'sass-embedded'

  constructor({
    includePaths = [],
    additionalData = '',
    webpackImporter,
    implementation = 'sass'
  }: TPluginOptions = {}) {
    this.includePaths = includePaths
    this.additionalData = additionalData
    this.webpackImporter = webpackImporter
    this.implementation = implementation
  }

  apply(compiler: webpack.Compiler) {
    const sassLoaderOptions = {
      // This enables the use of enhanced-resolve for @import statements prefixed with ~
      // but we don't usually use this and disabling it can speed up builds by up to 20%.
      webpackImporter: this.webpackImporter,
      // Prefer `dart-sass`.
      implementation: require(this.implementation),
      // Prepends SCSS code before the actual entry file.
      // Introduced to maintain snappy grid after n-ui-foundations removed it as the default.
      // Once user-facing apps and components move away from using snappy grid then this can be removed.
      additionalData: this.additionalData,
      sassOptions: {
        // Disable formatting so that we don't spend time pretty printing
        outputStyle: 'compressed',
        // Enable Sass to @import source files from installed dependencies
        includePaths: ['node_modules/@financial-times', 'node_modules', ...this.includePaths]
      }
    }

    const postcssLoaderOptions = {
      postcssOptions: {
        plugins: [
          // Allow @import of CSS files from node_modules
          // https://github.com/postcss/postcss-import
          require('postcss-import')()
        ]
      },
      implementation: require('postcss')
    }

    const cssLoaderOptions = {
      // sass-loader then postcss-loader run first
      // https://github.com/webpack-contrib/css-loader/blob/22e16e2fc88f920571219570953d3da5702d4fdb/README.md?plain=1#L921
      importLoaders: 2,
      // Allow css-loader to resolve @import because the sass-loader
      // does not successfully resolve files with a .css extension.
      import: true,
      // Disable Webpack from resolving url() because we do not
      // currently use this functionality.
      url: false
    }

    const miniCssExtractPluginOptions = {
      // only include content hash in filename when compiling production assets
      filename: compiler.options.mode === 'development' ? '[name].css' : '[name].[contenthash:12].css',
      // we load CSS files ourselves in  `dotcom-ui-shell` so don't need the runtime
      runtime: false
    }

    compiler.options.module.rules.push({
      test: [/\.sass|scss$/],
      use: [
        // Extracts CSS into separate, non-JS files
        // https://github.com/webpack-contrib/mini-css-extract-plugin
        {
          loader: MiniCssExtractPlugin.loader
        },
        // Add support for handling .css files
        // https://github.com/webpack-contrib/css-loader
        {
          loader: require.resolve('css-loader'),
          options: cssLoaderOptions
        },
        // Enable use of PostCSS for CSS postprocessing
        // https://github.com/postcss/postcss-loader
        {
          loader: require.resolve('postcss-loader'),
          options: postcssLoaderOptions
        },
        // Enable use of Sass for CSS preprocessing
        // https://github.com/webpack-contrib/sass-loader
        {
          loader: require.resolve('./monitored-sass-loader'),
          options: sassLoaderOptions
        }
      ]
    })

    compiler.options.optimization.minimizer = [
      ...(compiler.options.optimization.minimizer ?? []),
      new CSSMinimizerPlugin()
    ]

    // 2024 and this is still an issue :/ mini-css-extract-plugin leaves
    // behind empty .js bundles after extracting the CSS.
    // https://github.com/webpack/webpack/issues/11671
    new RemoveEmptyScriptsPlugin().apply(compiler)
    new MiniCssExtractPlugin(miniCssExtractPluginOptions).apply(compiler)
  }
}
