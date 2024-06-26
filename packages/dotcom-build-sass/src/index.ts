import StylesOnlyPlugin from 'webpack-fix-style-only-entries'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type webpack from 'webpack'

export type TPluginOptions = {
  includePaths?: string[]
  prependData?: string // DEPRECATED IN FAVOUR OF additionalData
  additionalData?: string
  webpackImporter?: boolean
  implementation?: 'sass' | 'sass-embedded'
}

export class PageKitSassPlugin {
  includePaths: string[]
  prependData: string // DEPRECATED IN FAVOUR OF additionalData
  additionalData: string
  webpackImporter: boolean
  implementation: 'sass' | 'sass-embedded'

  constructor({
    includePaths = [],
    prependData = '',
    additionalData = '',
    webpackImporter,
    implementation = 'sass'
  }: TPluginOptions = {}) {
    this.includePaths = includePaths
    this.additionalData = additionalData.length ? additionalData : prependData
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
        includePaths: ['bower_components', 'node_modules', ...this.includePaths]
      }
    }

    const autoprefixerOptions = {
      // https://github.com/browserslist/browserslist
      overrideBrowserslist: ['last 1 Chrome versions', 'Safari >= 13', 'ff ESR', 'last 1 Edge versions'],
      grid: true
    }

    // https://cssnano.co/guides/optimisations
    const cssnanoOptions = {
      preset: [
        'default',
        {
          // disable reduceInitial optimisation as `initial` is not supported in IE11
          // https://github.com/cssnano/cssnano/issues/721
          // https://developer.mozilla.org/en-US/docs/Web/CSS/initial
          reduceInitial: false
        }
      ]
    }

    const postcssLoaderOptions = {
      postcssOptions: {
        plugins: [
          // Allow @import of CSS files from node_modules
          // https://github.com/postcss/postcss-import
          require('postcss-import')(),
          // Add vendor prefixes automatically using data from Can I Use
          // https://github.com/postcss/autoprefixer
          require('autoprefixer')(autoprefixerOptions),
          // Ensure that the final result is as small as possible. This can
          // de-duplicate rule-sets which is useful if $o-silent-mode is toggled.
          // https://github.com/cssnano/cssnano
          require('cssnano')(cssnanoOptions)
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
      filename: compiler.options.mode === 'development' ? '[name].css' : '[name].[contenthash:12].css'
    }

    // This plugin prevents empty JS bundles being created for CSS entry points
    // https://github.com/fqborges/webpack-fix-style-only-entries
    const stylesOnlyPluginOptions = {
      silent: true
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

    new StylesOnlyPlugin(stylesOnlyPluginOptions).apply(compiler)
    new MiniCssExtractPlugin(miniCssExtractPluginOptions).apply(compiler)
  }
}
