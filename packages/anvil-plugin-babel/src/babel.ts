import { CliContext } from '@financial-times/anvil'

/**
 * Returns the babel config.
 *
 * NOTE: This file can also be specified as a preset in a .babelrc file.
 * When used in such a manner, there will be no args supplied to the function,
 * hence why the `context` arg is optional.
 */
export default (context?: CliContext) => {
  const presetEnvOpts = {}

  const config = {
    presets: [[require.resolve('@babel/preset-env'), presetEnvOpts]],
    plugins: [],
    babelrc: true
  }

  if (context) {
    context.amend('babelConfig', config)
    context.amend('babelConfig::preset::env::options', presetEnvOpts)
  }

  return config
}
