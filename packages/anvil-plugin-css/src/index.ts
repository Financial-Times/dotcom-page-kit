import { Plugin } from 'adonai'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import StylesOnlyPlugin from 'webpack-fix-style-only-entries'

export default new Plugin(({ on }) => {
  on('anvil::cli::operation::@build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig({ dispatcher: operation, webpackConfig }: RunningWebpackContext) {
  const isDevMode = operation.options.development

  const cssLoaderOptions = {}

  operation.amend('webpackConfig::cssPlugin::cssLoaderOptions', cssLoaderOptions)

  const cssRule = {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: require.resolve('css-loader'),
        options: cssLoaderOptions
      }
    ]
  }

  operation.amend('webpackConfig::cssPlugin::rule', cssRule)

  webpackConfig.module.rules.push(cssRule)

  // This plugin prevents empty JS bundles being created for CSS entry points
  // https://github.com/fqborges/webpack-fix-style-only-entries
  const stylesOnlyPluginOptions = {
    silent: true
  }

  operation.amend('webpackConfig::cssPlugin::stylesOnlyPluginOptions', stylesOnlyPluginOptions)

  webpackConfig.plugins.push(new StylesOnlyPlugin(stylesOnlyPluginOptions))

  const cssExtractPluginOptions = {
    // only include content hash in filename when compiling production assets
    filename: isDevMode ? '[name].css' : '[name].[contenthash:12].css'
  }

  operation.amend('webpackConfig::cssPlugin::cssExtractPluginOptions', cssExtractPluginOptions)

  webpackConfig.plugins.push(new MiniCssExtractPlugin(cssExtractPluginOptions))
}
