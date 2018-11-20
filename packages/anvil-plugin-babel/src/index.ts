import merge from 'webpack-merge'
import { Plugin } from 'adonai'
import babelPreset from './babel'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig(runningContext: RunningWebpackContext) {
  const context = runningContext.context
  const baseConfig = runningContext.webpackConfig
  const config = {
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              ...babelPreset(context),
              cacheDirectory: true
            }
          }
        }
      ]
    }
  }

  context.amend('webpackConfig::scriptsRule', config.module.rules[0])

  runningContext.webpackConfig = merge.smart(baseConfig, config)
}
