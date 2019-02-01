import babelPreset from './babel'
import { PluginSettings } from './types'
import { HandlerArgs } from '@financial-times/anvil'

export default ({ on }) => {
  on('babelConfig', addBabelPreset)
  on('babelConfig::preset::env::options', amendBabelPresetEnvOptions)
  on('webpackConfig::scriptsRule', amendWebpackConfigScriptsRule)
  on('webpackConfig', addTypeScriptFileTypesToResolvers)
}

function addTypeScriptFileTypesToResolvers({ resource: webpackConfig }: HandlerArgs) {
  webpackConfig.resolve.extensions.push('.ts', '.tsx')
}

function amendWebpackConfigScriptsRule({ resource: scriptsRule }) {
  // Replace default JS rule matcher with a RegExp including TypeScript files
  scriptsRule.test = /\.(js|jsx|mjs|ts|tsx)$/
  scriptsRule.use.options.cacheDirectory = true
}

function addBabelPreset({ cli, resource: babelConfig }: HandlerArgs) {
  babelConfig.presets.push(babelPreset(cli))
}

function amendBabelPresetEnvOptions({ cli, resource: options }) {
  const settings: PluginSettings = cli ? cli.config.settings['ft-js'] : {}
  options.targets = settings.presetEnvTargets || '> 1%, ie 11, bb 10'
}
