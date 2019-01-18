import { CliOperation } from '@financial-times/anvil'

/**
 * Returns the babel config.
 *
 * NOTE: This file can also be specified as a preset in a .babelrc file.
 * When used in such a manner, there will be no args supplied to the function,
 * hence why the `operation` arg is optional.
 */
export default (operation?: CliOperation) => {
  const presetEnvOpts = {}

  const config = {
    presets: [[require.resolve('@babel/preset-env'), presetEnvOpts]],
    plugins: [],
    babelrc: true
  }

  if (operation) {
    operation.amend('babelConfig', config)
    operation.amend('babelConfig::preset::env::options', presetEnvOpts)
  }

  return config
}
