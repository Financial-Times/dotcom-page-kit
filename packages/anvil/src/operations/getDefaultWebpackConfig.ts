import { CliContext } from '../context/CliContext'
import ManifestPlugin from 'webpack-manifest-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export function getDefaultWebpackConfig(context: CliContext) {
  const isDevMode = context.flags.devMode
  const opts = {
    cleanWebpackPlugin: {
      paths: [context.flags.outDir],
      options: { root: context.paths.workingDir, verbose: false }
    },
    manifestPlugin: {}
  }

  context.amend('webpackConfig::plugin::cleanWebpackPlugin::paths', opts.cleanWebpackPlugin.paths)
  context.amend('webpackConfig::plugin::cleanWebpackPlugin::options', opts.cleanWebpackPlugin.options)
  context.amend('webpackConfig::plugin::manifestPlugin::options', opts.manifestPlugin)

  const outputFilename = isDevMode ? '[name].bundle.js' : '[name].[contenthash:12].bundle.js'

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
      new CleanWebpackPlugin(opts.cleanWebpackPlugin.paths, opts.cleanWebpackPlugin.options),
      new ManifestPlugin(opts.manifestPlugin)
    ]
  }

  if (context.flags.devMode) {
    Object.assign(config, {
      mode: 'development',
      devtool: 'inline-source-map'
    })
  }

  return config
}
