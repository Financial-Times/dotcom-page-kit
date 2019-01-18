import get from 'lodash.get'
import ManifestPlugin from 'webpack-manifest-plugin'
import { CliOperation } from '../entities/CliOperation'
import { getBabelConfig } from './getBabelConfig'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export function getWebpackConfig(operation: CliOperation) {
  let jsRule

  const isDevMode = operation.options.development
  const entryOptions = get(operation, 'config.settings.entry') || operation.options.entryFile
  const outputFilename = isDevMode ? '[name].bundle.js' : '[name].[contenthash:12].bundle.js'
  const manifestPluginOptions = {}
  const cleanWebpackPluginPaths = [operation.options.outputPath]
  const cleanWebpackPluginOptions = { root: operation.workingDir, verbose: false }

  operation.amend('webpackConfig::entry', entryOptions)
  operation.amend('webpackConfig::plugins::cleanWebpackPlugin::options', cleanWebpackPluginOptions)
  operation.amend('webpackConfig::plugins::cleanWebpackPlugin::paths', cleanWebpackPluginPaths)
  operation.amend('webpackConfig::plugins::manifestPlugin::options', manifestPluginOptions)

  const webpackConfig = {
    mode: isDevMode ? 'development' : 'production',
    entry: entryOptions,
    output: {
      filename: outputFilename,
      chunkFilename: outputFilename,
      path: operation.options.outputPath
    },
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.json']
    },
    module: {
      rules: [
        (jsRule = {
          test: /\.(js|jsx|mjs)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              ...getBabelConfig(operation),
              cacheDirectory: true
            }
          }
        })
      ]
    },
    plugins: [
      new CleanWebpackPlugin(cleanWebpackPluginPaths, cleanWebpackPluginOptions),
      new ManifestPlugin(manifestPluginOptions)
    ],
    devtool: isDevMode ? 'cheap-module-eval-source-map' : 'source-map'
  }

  operation.amend('webpackConfig', webpackConfig)
  operation.amend('webpackConfig::jsRule', jsRule)

  return webpackConfig
}
