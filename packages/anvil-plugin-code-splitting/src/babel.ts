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
    dynamicImport: {}
  }

  const config = {
    plugins: [[require.resolve('@babel/plugin-syntax-dynamic-import'), opts.dynamicImport]]
  }

  if (operation) {
    operation.amend('babelConfig::plugin::syntaxDynamicImport::options', opts.dynamicImport)
  }

  return config
}
