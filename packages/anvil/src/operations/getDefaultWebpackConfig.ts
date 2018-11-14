import { CliContext } from '../context/CliContext'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export function getDefaultWebpackConfig(context: CliContext) {
  const cleanWebpackPluginPaths = [context.flags.outDir]
  const cleanWebpackPluginOptions = { root: context.paths.workingDir, verbose: false }
  context.amend('webpackConfig::plugin::cleanWebpackPlugin::paths', cleanWebpackPluginPaths)
  context.amend('webpackConfig::plugin::cleanWebpackPlugin::options', cleanWebpackPluginPaths)
  const cleanWebpackPlugin = new CleanWebpackPlugin(
    cleanWebpackPluginPaths,
    cleanWebpackPluginOptions
  )
  context.amend('webpackConfig::plugin::cleanWebpackPlugin', cleanWebpackPlugin)

  const config = {
    mode: 'production',
    entry: context.flags.srcFile,
    output: {
      filename: '[name].[contenthash:12].bundle.js',
      chunkFilename: '[name].[contenthash:12].bundle.js',
      path: context.flags.outDir
    },
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.json']
    },
    module: {
      rules: []
    },
    plugins: [cleanWebpackPlugin]
  }

  if (context.flags.devMode) {
    Object.assign(config, {
      mode: 'development',
      devtool: 'inline-source-map'
    })
  }

  return config
}
