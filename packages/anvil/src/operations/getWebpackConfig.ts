import get from 'lodash.get'
import ManifestPlugin from 'webpack-manifest-plugin'
import { CliContext } from '../entities/CliContext'
import { getBabelConfig } from './getBabelConfig'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export function getWebpackConfig({ options, workingDir, config, publish, cli }: CliContext) {
  let jsRule

  const isDevMode = options.development
  const entryOptions = get(config, 'settings.entry') || options.entryFile
  const outputFilename = isDevMode ? '[name].bundle.js' : '[name].[contenthash:12].bundle.js'
  const manifestPluginOptions = {}
  const cleanWebpackPluginPaths = [options.outputPath]
  const cleanWebpackPluginOptions = { root: workingDir, verbose: false }

  publish('webpackConfig::entry', entryOptions)
  publish('webpackConfig::plugins::manifestPlugin::options', manifestPluginOptions)
  publish('webpackConfig::plugins::cleanWebpackPlugin::paths', cleanWebpackPluginPaths)
  publish('webpackConfig::plugins::cleanWebpackPlugin::options', cleanWebpackPluginOptions)

  const webpackConfig = {
    mode: isDevMode ? 'development' : 'production',
    entry: entryOptions,
    output: {
      filename: outputFilename,
      chunkFilename: outputFilename,
      path: options.outputPath
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

  publish('webpackConfig', webpackConfig)
  publish('webpackConfig::jsRule', jsRule)

  return webpackConfig
}
