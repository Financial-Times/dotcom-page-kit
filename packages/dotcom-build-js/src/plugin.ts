import babelPreset from './babel'
import { HandlerArgs, hooks } from '@financial-times/dotcom-build-webpack-config'
import { PluginOptions } from './types'

const defaultOptions: PluginOptions = {
  jsxPragma: 'h',
  jsxPragmaFrag: 'Fragment'
}

export function plugin(userOptions: PluginOptions = {}) {
  const options = { ...defaultOptions, ...userOptions }

  return ({ on }) => {
    on(hooks.BABEL_CONFIG, addBabelPreset)
    on(hooks.WEBPACK_JS_RULE, amendWebpackConfigScriptsRule)
    on(hooks.WEBPACK_CONFIG, addTypeScriptFileTypesToResolvers)
  }

  function addTypeScriptFileTypesToResolvers({ resource: webpackConfig }: HandlerArgs) {
    webpackConfig.resolve.extensions.push('.ts', '.tsx')
  }

  function amendWebpackConfigScriptsRule({ resource: scriptsRule }) {
    // Replace default JS test with a RegExp including TypeScript file extensions
    scriptsRule.test.push(/\.(ts|tsx)$/)
  }

  function addBabelPreset({ context, resource: babelConfig }: HandlerArgs) {
     console.log(arguments)
    babelConfig.presets.push(babelPreset(options, context))
  }
}
