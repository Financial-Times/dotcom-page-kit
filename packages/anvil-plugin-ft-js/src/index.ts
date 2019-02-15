import babelPreset from './babel'
import { HandlerArgs } from '@financial-times/anvil'
import { PluginSettings } from './types'

export default (settings: PluginSettings = {}) => {
  return ({ on }) => {
    on('babelConfig', addBabelPreset)
    on('webpackConfig::scriptsRule', amendWebpackConfigScriptsRule)
    on('webpackConfig', addTypeScriptFileTypesToResolvers)
  }

  function addTypeScriptFileTypesToResolvers({ resource: webpackConfig }: HandlerArgs) {
    webpackConfig.resolve.extensions.push('.ts', '.tsx')
  }

  function amendWebpackConfigScriptsRule({ resource: scriptsRule }) {
    // Replace default JS test with a RegExp including TypeScript file extensions
    scriptsRule.test = /\.(js|jsx|mjs|ts|tsx)$/
  }

  function addBabelPreset({ cli, resource: babelConfig }: HandlerArgs) {
    babelConfig.presets.push(babelPreset(settings, cli))
  }
}
