import dlv from 'dlv'
import { hooks } from './hooks'
import StylesOnlyPlugin from 'webpack-fix-style-only-entries'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { ConfigContext } from '@financial-times/dotcom-build-webpack-config'

export type TPluginOptions = {
  includePaths?: Array<string>
  webpackImporter?: boolean
}

export function plugin(options: TPluginOptions = {}) {
  return ({ on }) => {
    on('webpackConfig', getWebpackConfigToMerge)
  }

  function getWebpackConfigToMerge({ context, publish }: ConfigContext) {
    const autoprefixerOptions = getAutoPrefixerOptions(context)
    const cssnanoOptions = getCssNanoOptions()
    const sassLoaderOptions = getSassLoaderOptions(options)
    const postcssLoaderOptions = getPostCssLoaderOptions(autoprefixerOptions, cssnanoOptions)
    const cssLoaderOptions = getCssLoaderOptions()
    const miniCssExtractPluginOptions = getMiniCssExtractPluginOptions(context)
    const stylesOnlyPluginOptions = getStylesOnlyPluginOptions()

    publish(hooks.POSTCSS_AUTOPREFIXER_OPTIONS, autoprefixerOptions)
    publish(hooks.POSTCSS_CSSNANO_OPTIONS, cssnanoOptions)
    publish(hooks.WEBPACK_SASS_LOADER_OPTIONS, sassLoaderOptions)
    publish(hooks.WEBPACK_POSTCSS_LOADER_OPTIONS, postcssLoaderOptions)
    publish(hooks.WEBPACK_CSS_LOADER_OPTIONS, cssLoaderOptions)
    publish(hooks.WEBPACK_MINI_CSS_EXTRACT_PLUGIN_OPTIONS, miniCssExtractPluginOptions)
    publish(hooks.WEBPACK_STYLES_ONLY_PLUGIN_OPTIONS, stylesOnlyPluginOptions)

    return {
      module: {
        rules: [
          publish(hooks.WEBPACK_SASS_RULE, {
            test: [/\.s(c|a)ss$/],
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
                loader: require.resolve('sass-loader'),
                options: sassLoaderOptions
              }
            ]
          })
        ]
      },
      plugins: [
        new StylesOnlyPlugin(stylesOnlyPluginOptions),
        new MiniCssExtractPlugin(miniCssExtractPluginOptions)
      ]
    }
  }

  function getSassLoaderOptions({ includePaths = [], webpackImporter = false }) {
    return {
      // This enables the use of enhanced-resolve for @import statements prefixed with ~
      // but we don't usually use this and disabling it can speed up builds by up to 20%.
      webpackImporter,
      // Prefer `dart-sass`.
      implementation: require('sass'),
      sassOptions: {
        // Disable formatting so that we don't spend time pretty printing
        outputStyle: 'compressed',
        // Enable Sass to @import source files from installed dependencies
        includePaths: ['bower_components', 'node_modules', ...includePaths]
      }
    }
  }

  function getAutoPrefixerOptions(context) {
    // https://github.com/browserslist/browserslist
    const defaultTargets = [
      'last 2 Chrome versions',
      'ie 11',
      'Safari >= 9.1',
      'ff ESR',
      'last 2 Edge versions'
    ]

    return {
      overrideBrowserslist: dlv(context, 'config.settings.build.targets', defaultTargets),
      grid: true
    }
  }

  function getCssNanoOptions() {
    // https://cssnano.co/guides/optimisations
    return {
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
  }

  function getPostCssLoaderOptions(autoprefixerOptions, cssnanoOptions) {
    return {
      plugins: [
        // Add vendor prefixes automatically using data from Can I Use
        // https://github.com/postcss/autoprefixer
        require('autoprefixer')(autoprefixerOptions),
        // Ensure that the final result is as small as possible. This can
        // de-duplicate rule-sets which is useful if $o-silent-mode is toggled.
        // https://github.com/cssnano/cssnano
        require('cssnano')(cssnanoOptions)
      ]
    }
  }

  function getCssLoaderOptions() {
    return {
      // Allow css-loader to resolve @import because the sass-loader
      // does not successfully resolve files with a .css extension.
      import: true,
      // Disable Webpack from resolving url() because we do not
      // currently use this functionality.
      url: false
    }
  }

  function getStylesOnlyPluginOptions() {
    // This plugin prevents empty JS bundles being created for CSS entry points
    // https://github.com/fqborges/webpack-fix-style-only-entries
    return {
      silent: true
    }
  }

  function getMiniCssExtractPluginOptions(context: ConfigContext) {
    return {
      // only include content hash in filename when compiling production assets
      filename: context.isDevMode ? '[name].css' : '[name].[contenthash:12].css'
    }
  }
}
