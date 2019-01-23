import { CliContext } from '@financial-times/anvil'

/**
 * Returns the babel config.
 *
 * NOTE: This file can also be specified as a preset in a .babelrc file.
 * When used in such a manner, there will be no args supplied to the function,
 * hence why the `cli` arg is optional.
 */

export default (cli?: CliContext) => {
  const classPropertiesPluginOptions = {}
  const syntaxDynamicImportPluginOptions = {}
  const transformRuntimePluginOptions = {
    corejs: false,
    helpers: true,
    regenerator: true
  }

  const config = {
    presets: [],
    plugins: [
      [require.resolve('@babel/plugin-proposal-class-properties'), classPropertiesPluginOptions],
      [require.resolve('@babel/plugin-syntax-dynamic-import'), syntaxDynamicImportPluginOptions],
      [require.resolve('@babel/plugin-transform-runtime'), transformRuntimePluginOptions]
    ]
  }

  if (cli) {
    cli.publish('babelConfig::plugin::proposalClassProperties::options', classPropertiesPluginOptions)
    cli.publish('babelConfig::plugin::syntaxDynamicImport::options', syntaxDynamicImportPluginOptions)
    cli.publish('babelConfig::plugin::transformRuntime::options', transformRuntimePluginOptions)
  }

  return config
}
