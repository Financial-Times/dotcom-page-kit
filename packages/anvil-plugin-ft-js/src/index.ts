import { Plugin } from 'adonai'
import babelPreset from './babel'
import { PluginSettings } from './types'
import { RunningWebpackContext, RunningBabelContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('babelConfig', addBabelPreset)
  on('babelConfig::preset::env::options', amendBabelPresetEnvOptions)
  on('webpackConfig::scriptsRule', amendWebpackConfigScriptsRule)
  on('webpackConfig', addTypeScriptFileTypesToResolvers)
})

function addTypeScriptFileTypesToResolvers({ webpackConfig }: RunningWebpackContext) {
  webpackConfig.resolve.extensions.push('.ts', '.tsx')
}

function amendWebpackConfigScriptsRule({ scriptsRule }) {
  // Replace default JS rule matcher with a RegExp including TypeScript files
  scriptsRule.test = /\.(js|jsx|mjs|ts|tsx)$/
  scriptsRule.use.options.cacheDirectory = true
}

function addBabelPreset({ cli, babelConfig }: RunningBabelContext) {
  babelConfig.presets.push(babelPreset(cli))
}

function amendBabelPresetEnvOptions({ cli, options }) {
  const settings: PluginSettings = cli ? cli.config.settings['ft-js'] : {}
  options.targets = settings.presetEnvTargets || '> 1%, ie 11, bb 10'
}
