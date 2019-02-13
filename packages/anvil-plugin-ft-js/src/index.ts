import babelPreset from './babel'
import { HandlerArgs } from '@financial-times/anvil'

export default ({ on }) => {
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
  babelConfig.presets.push(babelPreset(cli))
}
