import { hooks } from './hooks'
import { CliContext } from '@financial-times/anvil-cli'

export default (cli: CliContext) => {
  const classPropertiesPluginOptions = {}
  const syntaxDynamicImportPluginOptions = {}
  const transformRuntimePluginOptions = {}

  const config = {
    presets: [],
    plugins: [
      [require.resolve('@babel/plugin-proposal-class-properties'), classPropertiesPluginOptions],
      [require.resolve('@babel/plugin-syntax-dynamic-import'), syntaxDynamicImportPluginOptions],
      [require.resolve('@babel/plugin-transform-runtime'), transformRuntimePluginOptions]
    ]
  }

  cli.publish(hooks.BABEL_CLASS_PROPERTIES_PLUGIN_OPTIONS, classPropertiesPluginOptions)
  cli.publish(hooks.BABEL_SYNTAX_DYNAMIC_IMPORT_PLUGIN_OPTIONS, syntaxDynamicImportPluginOptions)
  cli.publish(hooks.BABEL_TRANSFORM_RUNTIME_PLUGIN_OPTIONS, transformRuntimePluginOptions)

  return config
}
