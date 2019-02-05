import { hooks } from './hooks'
import StylesOnlyPlugin from 'webpack-fix-style-only-entries'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { HandlerArgs, CliContext } from '@financial-times/anvil'

export const plugin = ({ on }) => {
  on('webpackConfig', getWebpackConfigToMerge)
}

function getWebpackConfigToMerge({ cli, publish }: HandlerArgs) {
  const cssLoaderOptions = {}
  const stylesOnlyPluginOptions = getStylesOnlyPluginOptions()
  const cssExtractPluginOptions = getCssExtractPluginOptions(cli)

  publish(hooks.CSS_LOADER_OPTIONS, cssLoaderOptions)
  publish(hooks.CSS_EXTRACT_PLUGIN_OPTIONS, cssExtractPluginOptions)
  publish(hooks.STYLES_ONLY_PLUGIN_OPTIONS, stylesOnlyPluginOptions)

  return {
    module: {
      rules: [
        publish(hooks.CSS_RULE, {
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
        })
      ]
    },
    plugins: [
      new StylesOnlyPlugin(stylesOnlyPluginOptions),
      new MiniCssExtractPlugin(cssExtractPluginOptions)
    ]
  }
}

function getCssExtractPluginOptions(cli: CliContext) {
  const filename = cli.options.development ? '[name].css' : '[name].[contenthash:12].css'
  return { filename }
}

function getStylesOnlyPluginOptions() {
  // This plugin prevents empty JS bundles being created for CSS entry points
  // https://github.com/fqborges/webpack-fix-style-only-entries
  return { silent: true }
}
