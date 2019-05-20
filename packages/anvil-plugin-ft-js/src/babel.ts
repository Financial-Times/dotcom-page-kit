import { PluginOptions } from './types'
import { CliContext } from '@financial-times/anvil-cli'

export default (pluginOptions: PluginOptions = {}, cli: CliContext) => {
  const jsx = {
    pragma: pluginOptions.jsxPragma || 'h',
    fragment: pluginOptions.jsxPragmaFrag || 'Fragment'
  }

  const options = {
    presetReact: {
      pragma: jsx.pragma,
      pragmaFrag: jsx.fragment
    },
    presetTypescript: {
      jsxPragma: jsx.pragma
    },
    pluginDynamicImport: {},
    pluginClassProperties: {},
    pluginTransformRuntime: {}
  }

  const config = {
    presets: [
      [require.resolve('@babel/preset-react'), options.presetReact],
      // This only enables the parsing of TypeScript, it does not check types
      [require.resolve('@babel/preset-typescript'), options.presetTypescript]
    ],
    plugins: [
      // This is required by @babel/preset-typescript
      // https://github.com/tc39/proposal-class-fields
      [require.resolve('@babel/plugin-proposal-class-properties'), options.pluginClassProperties],
      // This enables Babel's built-in 'dynamicImport' flag which defines import() function usage
      [require.resolve('@babel/plugin-syntax-dynamic-import'), options.pluginDynamicImport],
      [require.resolve('@babel/plugin-transform-runtime'), options.pluginTransformRuntime],
      // HACK: Allow CommonJS require() of ESM files without .default
      // This is here because we have a large amount of source code which still needs it.
      require.resolve('babel-plugin-transform-require-default')
    ]
  }

  cli.publish('babelConfig::preset::react::options', options.presetReact)
  cli.publish('babelConfig::preset::typescript::options', options.presetTypescript)
  cli.publish('babelConfig::plugin::proposalClassProperties::options', options.pluginClassProperties)
  cli.publish('babelConfig::plugin::syntaxDynamicImport::options', options.pluginDynamicImport)
  cli.publish('babelConfig::plugin::transformRuntime::options', options.pluginTransformRuntime)

  return config
}
