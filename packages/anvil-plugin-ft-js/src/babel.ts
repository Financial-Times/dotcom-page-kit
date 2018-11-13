import { OptionalAmender } from '@financial-times/anvil-types-adonai'

/**
 * Returns the babel config.
 *
 * NOTE: This file can also be specified as a preset in a .babelrc file.
 * When used in such a manner, there will be no args supplied to the function,
 * hence why the amender function is optional.
 */
export default ({ amend }: OptionalAmender = {}) => {
  const jsx = {
    pragma: 'h',
    fragment: 'Fragment'
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

  if (amend) {
    amend('babelConfig::preset::react::options', opts.presetReact)
    amend('babelConfig::preset::typescript::options', opts.presetTypescript)
    amend('babelConfig::plugin::proposalClassProperties::options', opts.pluginClassProperties)
    amend('babelConfig::plugin::proposalObjectRestSpread::options', opts.pluginObjectRestSpread)
    amend('babelConfig::plugin::syntaxDynamicImport::options', opts.pluginDynamicImport)
  }

  return config
}
