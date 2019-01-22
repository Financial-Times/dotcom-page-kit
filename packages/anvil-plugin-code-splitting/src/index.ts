import merge from 'webpack-merge'
import { Plugin } from 'adonai'
import babelPreset from './babel'
import { RunningWebpackContext, RunningBabelContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('anvil::cli::@build::babelConfig', amendBabelConfig)
  on('anvil::cli::@build::webpackConfig', amendWebpackConfig)
})

function amendBabelConfig({ cli, babelConfig }: RunningBabelContext) {
  babelConfig.presets.push(babelPreset(cli))
}

function amendWebpackConfig(runningContext: RunningWebpackContext) {
  const baseConfig = runningContext.webpackConfig
  const config = {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    }
  }
  runningContext.webpackConfig = merge(baseConfig, config)
}
