import { CliContext } from '@financial-times/anvil-plugin-helpers'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export function getDefaultWebpackConfig(c: CliContext) {
  const cleanWebpackPluginPaths = [c.flags.outDir]
  const cleanWebpackPluginOptions = { root: c.paths.workingDir, verbose: false }
  c.amend('webpackConfig::plugin::cleanWebpackPlugin::paths', cleanWebpackPluginPaths)
  c.amend('webpackConfig::plugin::cleanWebpackPlugin::options', cleanWebpackPluginPaths)
  const cleanWebpackPlugin = new CleanWebpackPlugin(
    cleanWebpackPluginPaths,
    cleanWebpackPluginOptions
  )
  c.amend('webpackConfig::plugin::cleanWebpackPlugin', cleanWebpackPlugin)

  const config = {
    mode: 'production',
    entry: c.flags.srcFile,
    output: {
      filename: '[name].[contenthash:12].bundle.js',
      chunkFilename: '[name].[contenthash:12].bundle.js',
      path: c.flags.outDir
    },
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.json']
    },
    module: {
      rules: []
    },
    plugins: [cleanWebpackPlugin]
  }

  if (c.flags.devMode) {
    Object.assign(config, {
      mode: 'development',
      devtool: 'inline-source-map'
    })
  }

  return config
}
