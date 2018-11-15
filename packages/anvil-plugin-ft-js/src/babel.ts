import { Settings } from './types'
import { CliContext } from '@financial-times/anvil'

/**
 * Returns the babel config
 *
 * NOTE: This file can also be specified as a preset in a .babelrc file.
 * When used in such a manner, there will be no args supplied to the function,
 * hence why the `context` arg is optional.
 */
export default (context?: CliContext, settings: Settings = {}) => {
  const jsx = {
    pragma: settings.jsxPragma || 'h',
    fragment: settings.jsxPragmaFrag || 'Fragment'
  }

  const opts = {
    presetReact: {
      pragma: jsx.pragma,
      pragmaFrag: jsx.fragment,
      useBuiltIns: false
    },
    presetTypescript: {
      jsxPragma: jsx.pragma
    },
    pluginDynamicImport: {},
    pluginClassProperties: {},
    pluginObjectRestSpread: {}
  }

  const config = {
    presets: [
      [require.resolve('@babel/preset-react'), opts.presetReact],
      [require.resolve('@babel/preset-typescript'), opts.presetTypescript]
    ],
    plugins: [
      [require.resolve('@babel/plugin-proposal-class-properties'), opts.pluginClassProperties],
      [require.resolve('@babel/plugin-proposal-object-rest-spread'), opts.pluginObjectRestSpread],
      [require.resolve('@babel/plugin-syntax-dynamic-import'), opts.pluginDynamicImport]
    ]
  }

  if (context) {
    context.amend('babelConfig::preset::react::options', opts.presetReact)
    context.amend('babelConfig::preset::typescript::options', opts.presetTypescript)
    context.amend('babelConfig::plugin::proposalClassProperties::options', opts.pluginClassProperties)
    context.amend('babelConfig::plugin::proposalObjectRestSpread::options', opts.pluginObjectRestSpread)
    context.amend('babelConfig::plugin::syntaxDynamicImport::options', opts.pluginDynamicImport)
  }

  return config
}
