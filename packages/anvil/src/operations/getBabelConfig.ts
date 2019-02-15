import { CliContext } from '../entities/CliContext'

/**
 * Returns the babel config.
 *
 * NOTE: This function is also used in the `babel.js` file in to root of the package
 * to construct a preset that can be specified in a .babelrc file. When used in as a preset,
 * there will be no args supplied to the function, hence why the arg is optional.
 */

export function getBabelConfig(cli?: CliContext) {
  const defaultTargets = '> 1%, ie 11, bb 10, ff ESR'
  const presetEnvOpts = {
    targets: cli.config.buildSettings.targets || defaultTargets,
    // Exclude transforms that make all code slower
    // See https://github.com/facebook/create-react-app/pull/5278
    exclude: ['transform-typeof-symbol']
  }

  const babelConfig = {
    // By default Babel assumes all source code is ESM so force it to check for CJS
    sourceType: 'unambiguous',
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
