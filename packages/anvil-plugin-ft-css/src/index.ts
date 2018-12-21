import { Plugin } from 'adonai'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import StylesOnlyPlugin from 'webpack-fix-style-only-entries'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig({ context, webpackConfig }: RunningWebpackContext) {
  const isDevMode = context.flags.development

  const sassLoaderOptions = {
    // Disable formatting so that we don't spend time pretty printing
    outputStyle: 'compressed',
    // Enable Sass to @import source files from installed dependencies
    includePaths: ['bower_components', 'node_modules/@financial-times']
  }

  context.amend('webpackConfig::ftCssPlugin::sassLoaderOptions', sassLoaderOptions)

  const autoprefixerOptions = {
    // https://github.com/browserslist/browserslist
    // TODO: make configurable via browserslist setting
    browsers: '> 1%, ie 11, bb 10',
    grid: true
  }

  context.amend('webpackConfig::ftCssPlugin::autoprefixerOptions', autoprefixerOptions)

  // https://cssnano.co/guides/optimisations
  const cssnanoOptions = {
    preset: 'default'
  }

  context.amend('webpackConfig::ftCssPlugin::cssnanoOptions', cssnanoOptions)

  const postcssLoaderOptions = {
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

  context.amend('webpackConfig::ftCssPlugin::postcssLoaderOptions', postcssLoaderOptions)

  const cssLoaderOptions = {
    // Disable Webpack from resolving @import because Sass should
    // have already resolved and concatenated these files.
    import: false,
    // Disable Webpack from resolving url() because we do not
    // currently use this functionality.
    url: false
  }

  context.amend('webpackConfig::ftCssPlugin::cssLoaderOptions', cssLoaderOptions)

  const cssRule = {
    test: /\.scss$/,
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
  }

  context.amend('webpackConfig::ftCssPlugin::rule', cssRule)

  webpackConfig.module.rules.push(cssRule)

  // This plugin prevents empty JS bundles being created for CSS entry points
  // https://github.com/fqborges/webpack-fix-style-only-entries
  const stylesOnlyPluginOptions = {
    silent: true
  }

  context.amend('webpackConfig::ftCssPlugin::stylesOnlyPluginOptions', stylesOnlyPluginOptions)

  webpackConfig.plugins.push(new StylesOnlyPlugin(stylesOnlyPluginOptions))

  const cssExtractPluginOptions = {
    // only include content hash in filename when compiling production assets
    filename: isDevMode ? '[name].css' : '[name].[contenthash:12].css'
  }

  context.amend('webpackConfig::ftCssPlugin::cssExtractPluginOptions', cssExtractPluginOptions)

  webpackConfig.plugins.push(new MiniCssExtractPlugin(cssExtractPluginOptions))
}
