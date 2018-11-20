import { Plugin } from 'adonai'
import babelPreset from './babel'
import { Settings } from './types'
import { RunningBabelContext } from '@financial-times/anvil-types-build'

export default (settings: Settings = {}) => {
  return new Plugin(({ on }) => {
    on('@Build::amend::babelConfig', addPresetToBabelConfig(settings))
    on('@Build::amend::babelConfig::preset::env::options', amendBabelPresetEnvOptions(settings))
    on('@Build::amend::webpackConfig::scriptsRule', useCacheDirInScriptsRule)
    on('@Build::amend::webpackConfig', amendWebpackConfig)
  })
}

function useCacheDirInScriptsRule({ scriptsRule }) {
  scriptsRule.test = /\.(js|jsx|mjs|ts|tsx)$/
  scriptsRule.use.options.cacheDirectory = true
}

function addPresetToBabelConfig(settings) {
  return ({ context, babelConfig }: RunningBabelContext) => {
    babelConfig.presets.push(babelPreset(context, settings))
  }
}

function amendBabelPresetEnvOptions(settings: Settings) {
  return ({ options }) => ({
    ...options,
    targets: settings.envTargets || '> 1%, ie 11, bb 10',
    useBuiltIns: true
  })
}

function amendWebpackConfig({ webpackConfig }) {
  webpackConfig.resolve.extensions.push('.ts', '.tsx')
}
