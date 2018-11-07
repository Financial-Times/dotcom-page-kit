import merge from 'webpack-merge'
import { Plugin } from 'adonai'
import babelPreset from './babel'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig(runningContext) {
  const c = runningContext.c
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
              ...babelPreset(c),
              cacheDirectory: true
            }
          }
        }
      ]
    }
  }

  c.amend('webpackConfig::rule::scriptsRule', config.module.rules[0])

  runningContext.webpackConfig = merge.smart(baseConfig, config)
}
