import { CliOperation } from '../entities/CliOperation'

/**
 * Returns the babel config.
 *
 * NOTE: This function is also used in the `babel.js` file in to root of the package
 * to construct a preset that can be specified in a .babelrc file. When used in as a preset,
 * there will be no args supplied to the function, hence why the `operation` arg is optional.
 */
export function getBabelConfig(operation?: CliOperation) {
  const presetEnvOpts = {}

  const babelConfig = {
    presets: [[require.resolve('@babel/preset-env'), presetEnvOpts]],
    plugins: [],
    babelrc: true
  }

  if (operation) {
    operation.amend('babelConfig', babelConfig)
    operation.amend('babelConfig::preset::env::options', presetEnvOpts)
  }

  return babelConfig
}
