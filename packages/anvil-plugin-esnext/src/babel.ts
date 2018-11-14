import { OptionalAmender } from '@financial-times/anvil-types-adonai'

/**
 * Returns the babel config.
 *
 * NOTE: This file can also be specified as a preset in a .babelrc file.
 * When used in such a manner, there will be no args supplied to the function,
 * hence why the amender function is optional.
 */
export default ({ amend }: OptionalAmender = {}) => {
  const opts = {
    classProperties: {},
    objectRestSpread: {},
    dynamicImport: {}
  }

  const config = {
    presets: [],
    plugins: [
      [require.resolve('@babel/plugin-proposal-class-properties'), opts.classProperties],
      [require.resolve('@babel/plugin-proposal-object-rest-spread'), opts.objectRestSpread],
      [require.resolve('@babel/plugin-syntax-dynamic-import'), opts.dynamicImport]
    ]
  }

  if (amend) {
    amend('babelConfig::plugin::proposalClassProperties::options', opts.classProperties)
    amend('babelConfig::plugin::proposalObjectRestSpread::options', opts.objectRestSpread)
    amend('babelConfig::plugin::syntaxDynamicImport::options', opts.dynamicImport)
  }

  return config
}
