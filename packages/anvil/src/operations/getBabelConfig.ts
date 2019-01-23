import { CliContext } from '../entities/CliContext'

/**
 * Returns the babel config.
 *
 * NOTE: This function is also used in the `babel.js` file in to root of the package
 * to construct a preset that can be specified in a .babelrc file. When used in as a preset,
 * there will be no args supplied to the function, hence why the `cli` arg is optional.
 */
export function getBabelConfig(cli?: CliContext) {
  const presetEnvOpts = {}

  const babelConfig = {
    presets: [[require.resolve('@babel/preset-env'), presetEnvOpts]],
    plugins: [],
    babelrc: true
  }

  if (cli) {
    cli.publish('babelConfig', babelConfig)
    cli.publish('babelConfig::preset::env::options', presetEnvOpts)
  }

  return babelConfig
}
