import { CliOperation } from '@financial-times/anvil'

/**
 * Returns the babel config.
 *
 * NOTE: This file can also be specified as a preset in a .babelrc file.
 * When used in such a manner, there will be no args supplied to the function,
 * hence why the `operation` arg is optional.
 */
export default (operation?: CliOperation) => {
  const opts = {
    classProperties: {},
    objectRestSpread: {},
    syntaxDynamicImport: {},
    transformRuntime: {}
  }

  const config = {
    presets: [],
    plugins: [
      [require.resolve('@babel/plugin-proposal-class-properties'), opts.classProperties],
      [require.resolve('@babel/plugin-proposal-object-rest-spread'), opts.objectRestSpread],
      [require.resolve('@babel/plugin-syntax-dynamic-import'), opts.syntaxDynamicImport],
      [require.resolve('@babel/plugin-transform-runtime'), opts.transformRuntime]
    ]
  }

  if (operation) {
    operation.amend('babelConfig::plugin::proposalClassProperties::options', opts.classProperties)
    operation.amend('babelConfig::plugin::proposalObjectRestSpread::options', opts.objectRestSpread)
    operation.amend('babelConfig::plugin::syntaxDynamicImport::options', opts.syntaxDynamicImport)
    operation.amend('babelConfig::plugin::transformRuntime::options', opts.transformRuntime)
  }

  return config
}
