import get from 'lodash.get'
import { hooks } from '../entities/hooks'
import { CliContext } from '../entities/CliContext'
import { getBabelConfig } from './getBabelConfig'
import ManifestPlugin from 'webpack-assets-manifest'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export function getWebpackConfig({ options, config, publish, cli }: CliContext) {
  const isDevMode = options.development
  const entryOptions = get(config, 'settings.build.entry') || options.entryFile
  const outputPath = get(config, 'settings.build.outputPath') || options.outputPath
  const outputFileName = isDevMode ? '[name].bundle.js' : '[name].[contenthash:12].bundle.js'
  const manifestFileName = get(config, 'settings.build.manifestFileName') || 'manifest.json'
  const manifestPluginOptions = { output: manifestFileName, entrypoints: true }
  const cleanWebpackPluginOptions = { verbose: false }

  publish(hooks.WEBPACK_MANIFEST_PLUGIN_OPTIONS, manifestPluginOptions)
  publish(hooks.WEBPACK_CLEAN_PLUGIN_OPTIONS, cleanWebpackPluginOptions)

  return publish(hooks.WEBPACK_CONFIG, {
    mode: isDevMode ? 'development' : 'production',
    entry: entryOptions,
    output: {
      filename: outputFileName,
      chunkFilename: outputFileName,
      path: outputPath
    },
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.json']
    },
    module: {
      rules: [
        publish(hooks.WEBPACK_JS_RULE, {
          test: [/\.(js|jsx|mjs)$/],
          // NOTE: Do not exclude bower_components or node_modules directories
          // https://github.com/Financial-Times/dotcom-page-kit/issues/366
          exclude: [],
          use: {
            loader: require.resolve('babel-loader'),
            options: getBabelConfig(cli)
          }
        })
      ]
    },
    plugins: [new CleanWebpackPlugin(cleanWebpackPluginOptions), new ManifestPlugin(manifestPluginOptions)],
    devtool: isDevMode ? 'cheap-module-eval-source-map' : 'source-map',
    bail: isDevMode ? false : true
  })
}
