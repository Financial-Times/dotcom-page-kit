import { CliContext } from '../context/CliContext'
import ManifestPlugin from 'webpack-manifest-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export function getDefaultWebpackConfig(context: CliContext) {
  const isDevMode = context.flags.devMode

  const outputFilename = isDevMode ? '[name].bundle.js' : '[name].[contenthash:12].bundle.js'

  const cleanWebpackPluginPaths = [context.flags.outDir]
  const cleanWebpackPluginOptions = { root: context.paths.workingDir, verbose: false }

  const manifestPluginOptions = {}

  const config = {
    mode: isDevMode ? 'development' : 'production',
    entry: context.flags.srcFile,
    output: {
      filename: outputFilename,
      chunkFilename: outputFilename,
      path: context.flags.outDir
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
    devtool: 'source-map'
  }

  context.amend('webpackConfig::plugin::cleanWebpackPlugin::options', cleanWebpackPluginOptions)
  context.amend('webpackConfig::plugin::cleanWebpackPlugin::paths', cleanWebpackPluginPaths)
  context.amend('webpackConfig::plugin::manifestPlugin::options', manifestPluginOptions)

  return config
}
