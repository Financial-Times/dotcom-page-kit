import { CliContext } from '../context/CliContext'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'

export function getDefaultWebpackConfig(context: CliContext) {
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
