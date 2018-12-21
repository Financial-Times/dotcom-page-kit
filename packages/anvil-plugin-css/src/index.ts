import { Plugin } from 'adonai'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import StylesOnlyPlugin from 'webpack-fix-style-only-entries'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig({ context, webpackConfig }: RunningWebpackContext) {
  const isDevMode = context.flags.development

  const cssLoaderOptions = {}

  context.amend('webpackConfig::cssPlugin::cssLoaderOptions', cssLoaderOptions)

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

  context.amend('webpackConfig::cssPlugin::rule', cssRule)

  webpackConfig.module.rules.push(cssRule)

  const stylesOnlyPluginOptions = {}

  context.amend('webpackConfig::cssPlugin::stylesOnlyPluginOptions', stylesOnlyPluginOptions)

  webpackConfig.plugins.push(new StylesOnlyPlugin(stylesOnlyPluginOptions))

  const cssExtractPluginOptions = {
    // only include content hash in filename when compiling production assets
    filename: isDevMode ? '[name].css' : '[name].[contenthash:12].css'
  }

  context.amend('webpackConfig::cssPlugin::cssExtractPluginOptions', cssExtractPluginOptions)

  webpackConfig.plugins.push(new MiniCssExtractPlugin(cssExtractPluginOptions))
}
