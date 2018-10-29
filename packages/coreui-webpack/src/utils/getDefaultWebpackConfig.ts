import { CliContext } from 'coreui-common'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import getDefaultBabelConfig from 'coreui-babel'

export function getDefaultWebpackConfig(c: CliContext) {
  const babelConfig = getDefaultBabelConfig()
  c.amend('babelConfig', babelConfig)

  const cleanWebpackPluginPaths = [c.flags.outDir]
  const cleanWebpackPluginOptions = { root: c.paths.workingDir, verbose: false }
  c.amend('webpackConfig::plugin::cleanWebpackPlugin::paths', cleanWebpackPluginPaths)
  c.amend('webpackConfig::plugin::cleanWebpackPlugin::options', cleanWebpackPluginPaths)
  const cleanWebpackPlugin = new CleanWebpackPlugin(
    cleanWebpackPluginPaths,
    cleanWebpackPluginOptions
  )
  c.amend('webpackConfig::plugin::cleanWebpackPlugin', cleanWebpackPlugin)

  // prettier-ignore
  const config = {
    mode: 'production',
    entry: c.flags.srcFile,
    output: {
      filename: '[name].[contenthash:12].bundle.js',
      chunkFilename: '[name].[contenthash:12].bundle.js',
      path: c.flags.outDir
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.json']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs|ts|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {

            loader: require.resolve('babel-loader'),
            options: {
              ...babelConfig,
              cacheDirectory: true
            }
          }
        }
      ]
    },
    plugins: [
      cleanWebpackPlugin
    ]
  }

  if (c.flags.devMode) {
    Object.assign(config, {
      mode: 'development',
      devtool: 'inline-source-map'
    })
  }

  c.amend('webpackConfig::rule::scriptsRule', config.module.rules[0])

  return config
}

// TODO: Pass in the working directory
// TODO: Make the options for CleanWebpackPlugin available to be amended
// TODO: Decide whether it will be better to use typescript-loader
// TODO: Add an example showing the use of a custom babelrc
