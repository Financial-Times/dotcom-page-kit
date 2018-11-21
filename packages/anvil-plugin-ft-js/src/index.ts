import { Plugin } from 'adonai'
import babelPreset from './babel'
import { RunningWebpackContext, RunningBabelContext } from '@financial-times/anvil-types-build'
import { PluginSettings } from './types'

export default new Plugin(({ on }) => {
  on('@Build::amend::babelConfig', amendBabelConfig)
  on('@Build::amend::babelConfig::preset::env::options', amendBabelPresetEnvOptions)
  on('@Build::amend::webpackConfig::scriptsRule', amendWebpackConfigScriptsRule)
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig({ webpackConfig }: RunningWebpackContext) {
  // Add TypeScript files to the list of file extensions to resolve
  webpackConfig.resolve.extensions.push('.ts', '.tsx')
}

function amendWebpackConfigScriptsRule({ scriptsRule }) {
  // Replace default JS rule matcher with a RegExp including TypeScript files
  scriptsRule.test = /\.(js|jsx|mjs|ts|tsx)$/
  // Enable Babel caching to avoid running recompilation for each run
  scriptsRule.use.options.cacheDirectory = true
}

function amendBabelConfig({ context, babelConfig }: RunningBabelContext) {
  babelConfig.presets.push(babelPreset(context))
}

function amendBabelPresetEnvOptions({ context, options }) {
  const settings: PluginSettings = context ? context.config.settings['ft-js'] : {}
  options.targets = settings.presetEnvTargets || '> 1%, ie 11, bb 10'
}
