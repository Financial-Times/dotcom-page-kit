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

  if (context) {
    context.amend('babelConfig::plugin::proposalClassProperties::options', opts.classProperties)
    context.amend('babelConfig::plugin::proposalObjectRestSpread::options', opts.objectRestSpread)
    context.amend('babelConfig::plugin::syntaxDynamicImport::options', opts.syntaxDynamicImport)
    context.amend('babelConfig::plugin::transformRuntime::options', opts.transformRuntime)
  }

  return config
}
