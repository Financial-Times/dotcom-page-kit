import get from 'lodash.get'
import { CliOperation } from '../entities/CliOperation'
import ManifestPlugin from 'webpack-manifest-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export function getWebpackConfig(operation: CliOperation) {
  const isDevMode = operation.options.development
  const entryOptions = get(operation, 'config.settings.entry') || operation.options.entryFile
  const cleanWebpackPluginPaths = [operation.options.outputPath]
  const cleanWebpackPluginOptions = { root: operation.workingDir, verbose: false }
  const manifestPluginOptions = {}

  operation.amend('webpackConfig::plugins::cleanWebpackPlugin::options', cleanWebpackPluginOptions)
  operation.amend('webpackConfig::plugins::cleanWebpackPlugin::paths', cleanWebpackPluginPaths)
  operation.amend('webpackConfig::plugins::manifestPlugin::options', manifestPluginOptions)
  operation.amend('webpackConfig::entry', entryOptions)

  const outputFilename = isDevMode ? '[name].bundle.js' : '[name].[contenthash:12].bundle.js'

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
      rules: []
    },
    plugins: [
      new CleanWebpackPlugin(cleanWebpackPluginPaths, cleanWebpackPluginOptions),
      new ManifestPlugin(manifestPluginOptions)
    ],
    devtool: isDevMode ? 'cheap-module-eval-source-map' : 'source-map'
  }

  operation.amend('webpackConfig', webpackConfig)

  return webpackConfig
}
