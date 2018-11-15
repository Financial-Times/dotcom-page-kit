import { CliContext } from '@financial-times/anvil'

/**
 * Returns the babel config.
 *
 * NOTE: This file can also be specified as a preset in a .babelrc file.
 * When used in such a manner, there will be no args supplied to the function,
 * hence why the `context` arg is optional.
 */
export default (context?: CliContext) => {
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

  if (context) {
    context.amend('babelConfig::plugin::proposalClassProperties::options', opts.classProperties)
    context.amend('babelConfig::plugin::proposalObjectRestSpread::options', opts.objectRestSpread)
    context.amend('babelConfig::plugin::syntaxDynamicImport::options', opts.dynamicImport)
  }

  return config
}
