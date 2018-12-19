import { Plugin } from 'adonai'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig({ context, webpackConfig }: RunningWebpackContext) {
  const isDevMode = context.flags.devMode

  const cssLoaderOptions = {}

  const miniCssExtractPluginOptions = {
    // only include content hash in filename when compiling production assets
    filename: isDevMode ? '[name].css' : '[name].[contenthash:12].css'
  }

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

  context.amend('webpackConfig::cssPlugin', cssRule)
  context.amend('webpackConfig::cssPlugin::cssLoaderOptions', cssLoaderOptions)
  context.amend('webpackConfig::cssPlugin::miniCssExtractPluginOptions', miniCssExtractPluginOptions)

  const miniCssExtractPlugin = new MiniCssExtractPlugin(miniCssExtractPluginOptions)

  webpackConfig.plugins.push(miniCssExtractPlugin)
  webpackConfig.module.rules.push(cssRule)
}
