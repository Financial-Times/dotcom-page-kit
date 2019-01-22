import get from 'lodash.get'
import ManifestPlugin from 'webpack-manifest-plugin'
import { CliContext } from '../entities/CliContext'
import { getBabelConfig } from './getBabelConfig'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export function getWebpackConfig(cli: CliContext) {
  let jsRule

  const isDevMode = cli.options.development
  const entryOptions = get(cli, 'config.settings.entry') || cli.options.entryFile
  const outputFilename = isDevMode ? '[name].bundle.js' : '[name].[contenthash:12].bundle.js'
  const manifestPluginOptions = {}
  const cleanWebpackPluginPaths = [cli.options.outputPath] // TODO: This value is not being set
  const cleanWebpackPluginOptions = { root: cli.workingDir, verbose: false }

  cli.publish('webpackConfig::entry', entryOptions)
  cli.publish('webpackConfig::plugins::manifestPlugin::options', manifestPluginOptions)
  cli.publish('webpackConfig::plugins::cleanWebpackPlugin::paths', cleanWebpackPluginPaths)
  cli.publish('webpackConfig::plugins::cleanWebpackPlugin::options', cleanWebpackPluginOptions)

  const webpackConfig = {
    mode: isDevMode ? 'development' : 'production',
    entry: entryOptions,
    output: {
      filename: outputFilename,
      chunkFilename: outputFilename,
      path: cli.options.outputPath
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
              ...getBabelConfig(cli),
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

  cli.publish('webpackConfig', webpackConfig)
  cli.publish('webpackConfig::jsRule', jsRule)

  return webpackConfig
}
