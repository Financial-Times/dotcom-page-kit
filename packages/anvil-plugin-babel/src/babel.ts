import { OptionalAmender } from '@financial-times/anvil-types-adonai'

/**
 * Returns the babel config.
 *
 * NOTE: This file can also be specified as a preset in a .babelrc file.
 * When used in such a manner, there will be no args supplied to the function,
 * hence why the amender function is optional.
 */
export default ({ amend }: OptionalAmender = {}) => {
  const presetEnvOpts = {}

  const config = {
    presets: [[require.resolve('@babel/preset-env'), presetEnvOpts]],
    plugins: [],
    babelrc: true
  }

  if (amend) {
    amend('babelConfig', config)
    amend('babelConfig::preset::env::options', presetEnvOpts)
  }

  return config
}
