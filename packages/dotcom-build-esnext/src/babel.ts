import { hooks } from './hooks'
import { CliContext } from '@financial-times/dotcom-page-kit-cli'

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

  cli.publish(hooks.BABEL_PLUGIN_CLASS_PROPERTIES_OPTIONS, classPropertiesPluginOptions)
  cli.publish(hooks.BABEL_PLUGIN_SYNTAX_DYNAMIC_IMPORT_OPTIONS, syntaxDynamicImportPluginOptions)
  cli.publish(hooks.BABEL_PLUGIN_TRANSFORM_RUNTIME_OPTIONS, transformRuntimePluginOptions)

  return config
}
