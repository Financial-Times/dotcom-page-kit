import { hooks } from './hooks'
import StylesOnlyPlugin from 'webpack-fix-style-only-entries'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { HandlerArgs, CliContext } from '@financial-times/anvil-cli'

export function plugin() {
  return ({ on }) => {
    on('webpackConfig', getWebpackConfigToMerge)
  }
}

function getWebpackConfigToMerge({ cli, publish }: HandlerArgs) {
  const cssLoaderOptions = {}
  const stylesOnlyPluginOptions = getStylesOnlyPluginOptions()
  const miniCssExtractPluginOptions = getMiniCssExtractPluginOptions(cli)

  publish(hooks.WEBPACK_CSS_LOADER_OPTIONS, cssLoaderOptions)
  publish(hooks.WEBPACK_MINI_CSS_EXTRACT_PLUGIN_OPTIONS, miniCssExtractPluginOptions)
  publish(hooks.WEBPACK_STYLES_ONLY_PLUGIN_OPTIONS, stylesOnlyPluginOptions)

  return {
    module: {
      rules: [
        publish(hooks.WEBPACK_CSS_RULE, {
          test: [/\.css$/],
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
      new MiniCssExtractPlugin(miniCssExtractPluginOptions)
    ]
  }
}

function getMiniCssExtractPluginOptions(cli: CliContext) {
  return {
    // only include content hash in filename when compiling production assets
    filename: cli.options.development ? '[name].css' : '[name].[contenthash:12].css'
  }
}

function getStylesOnlyPluginOptions() {
  // This plugin prevents empty JS bundles being created for CSS entry points
  // https://github.com/fqborges/webpack-fix-style-only-entries
  return { silent: true }
}
