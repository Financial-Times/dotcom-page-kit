import babelPreset from './babel'
import { HandlerArgs } from '@financial-times/dotcom-page-kit-cli'
import { PluginOptions } from './types'

const defaultOptions: PluginOptions = {
  jsxPragma: 'h',
  jsxPragmaFrag: 'Fragment',
  enableRequireDefault: false
}

export function plugin(userOptions: PluginOptions = {}) {
  const options = { ...defaultOptions, ...userOptions }

  return ({ on }) => {
    on('babelConfig', addBabelPreset)
    on('webpackConfig::jsRule', amendWebpackConfigScriptsRule)
    on('webpackConfig', addTypeScriptFileTypesToResolvers)
  }

  function addTypeScriptFileTypesToResolvers({ resource: webpackConfig }: HandlerArgs) {
    webpackConfig.resolve.extensions.push('.ts', '.tsx')
  }

  function amendWebpackConfigScriptsRule({ resource: scriptsRule }) {
    // Replace default JS test with a RegExp including TypeScript file extensions
    scriptsRule.test.push(/\.(ts|tsx)$/)
  }

  function addBabelPreset({ cli, resource: babelConfig }: HandlerArgs) {
    babelConfig.presets.push(babelPreset(options, cli))
  }
}
