import { CliContext } from '../context/CliContext'
import ManifestPlugin from 'webpack-manifest-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export function getDefaultWebpackConfig({ flags, config, paths, amend }: CliContext) {
  const isDevMode = flags.development

  const entryOptions = (config.settings && config.settings.entry) || flags.entryFile

  const cleanWebpackPluginPaths = [flags.outputPath]
  const cleanWebpackPluginOptions = { root: paths.workingDir, verbose: false }

  const manifestPluginOptions = {}

  amend('webpackConfig::plugins::cleanWebpackPlugin::options', cleanWebpackPluginOptions)
  amend('webpackConfig::plugins::cleanWebpackPlugin::paths', cleanWebpackPluginPaths)
  amend('webpackConfig::plugins::manifestPlugin::options', manifestPluginOptions)
  amend('webpackConfig::entry', entryOptions)

  const outputFilename = isDevMode ? '[name].bundle.js' : '[name].[contenthash:12].bundle.js'

  const defaultWebpackConfig = {
    mode: isDevMode ? 'development' : 'production',
    entry: entryOptions,
    output: {
      filename: outputFilename,
      chunkFilename: outputFilename,
      path: flags.outputPath
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

  return defaultWebpackConfig
}
