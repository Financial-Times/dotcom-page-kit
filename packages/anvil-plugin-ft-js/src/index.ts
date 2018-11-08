import { Plugin } from 'adonai'
import babelPreset from './babel'

export default new Plugin(({ on }) => {
  on('@Build::amend::babelConfig', addPresetToBabelConfig)
  on('@Build::amend::babelConfig::preset::env::options', amendBabelPresetEnvOptions)
  on('@Build::amend::webpackConfig::rule::scriptsRule', useCacheDirInScriptsRule)
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function useCacheDirInScriptsRule({ scriptsRule }) {
  scriptsRule.test = /\.(js|jsx|mjs|ts|tsx)$/
  scriptsRule.use.options.cacheDirectory = true
}

function addPresetToBabelConfig({ c, babelConfig }) {
  babelConfig.presets.push(babelPreset(c))
}

function amendBabelPresetEnvOptions({ options }) {
  return {
    ...options,
    targets: '> 1%, ie 11, bb 10',
    useBuiltIns: true
  }
}

function amendWebpackConfig({ webpackConfig }) {
  webpackConfig.resolve.extensions.push('.ts', '.tsx')
}
