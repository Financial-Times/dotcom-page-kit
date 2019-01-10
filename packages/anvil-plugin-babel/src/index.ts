import merge from 'webpack-merge'
import { Plugin } from 'adonai'
import babelPreset from './babel'
import { CliOperation } from '@financial-times/anvil'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('anvil::cli::operation::@build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig(context: RunningWebpackContext) {
  const operation = context.dispatcher as CliOperation
  const baseConfig = context.webpackConfig
  const config = {
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              ...babelPreset(operation),
              cacheDirectory: true
            }
          }
        }
      ]
    }
  }

  operation.amend('webpackConfig::scriptsRule', config.module.rules[0])

  context.webpackConfig = merge.smart(baseConfig, config)
}
