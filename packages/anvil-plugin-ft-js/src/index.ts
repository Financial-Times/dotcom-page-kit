import { Plugin } from 'adonai'
import babelPreset from './babel'
import { PluginSettings } from './types'
import { RunningWebpackContext, RunningBabelContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('anvil::cli::@build::babelConfig', addBabelPreset)
  on('anvil::cli::@build::babelConfig::preset::env::options', amendBabelPresetEnvOptions)
  on('anvil::cli::@build::webpackConfig::scriptsRule', amendWebpackConfigScriptsRule)
  on('anvil::cli::@build::webpackConfig', addTypeScriptFileTypesToResolvers)
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
