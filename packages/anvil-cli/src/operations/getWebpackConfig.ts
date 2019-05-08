import get from 'lodash.get'
import ManifestPlugin from 'webpack-assets-manifest'
import { CliContext } from '../entities/CliContext'
import { getBabelConfig } from './getBabelConfig'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export function getWebpackConfig({ options, workingDir, config, publish, cli }: CliContext) {
  let jsRule

  const isDevMode = options.development
  const entryOptions = get(config, 'settings.build.entry') || options.entryFile
  const outputPath = get(config, 'settings.build.outputPath') || options.outputPath
  const outputFileName = isDevMode ? '[name].bundle.js' : '[name].[contenthash:12].bundle.js'
  const manifestFileName = get(config, 'settings.build.manifestFileName') || 'manifest.json'
  const manifestPluginOptions = { output: manifestFileName, entrypoints: true }
  const cleanWebpackPluginPaths = [outputPath]
  const cleanWebpackPluginOptions = { root: workingDir, verbose: false }

  publish('webpackConfig::entry', entryOptions)
  publish('webpackConfig::plugins::manifestPlugin::options', manifestPluginOptions)
  publish('webpackConfig::plugins::cleanWebpackPlugin::paths', cleanWebpackPluginPaths)
  publish('webpackConfig::plugins::cleanWebpackPlugin::options', cleanWebpackPluginOptions)

  const webpackConfig = {
    mode: isDevMode ? 'development' : 'production',
    entry: entryOptions,
    output: {
      filename: outputFileName,
      chunkFilename: outputFileName,
      path: outputPath
    },
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.json']
    },
    module: {
      rules: [
        (jsRule = {
          test: [/\.(js|jsx|mjs)$/],
          // NOTE: Do not exclude bower_components directory because Origami components
          // installed with Bower are ES6/source code
          exclude: [/node_modules/],
          use: {
            loader: require.resolve('babel-loader'),
            options: getBabelConfig(cli)
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
