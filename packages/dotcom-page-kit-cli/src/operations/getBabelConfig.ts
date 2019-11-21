import get from 'lodash.get'
import { hooks } from '../entities/hooks'
import { CliContext } from '../entities/CliContext'

export function getBabelConfig(cli: CliContext) {
  const defaultTargets = [
    'last 2 Chrome versions',
    'ie 11',
    'Safari >= 9.1',
    'ff ESR',
    'last 2 Edge versions'
  ]

  const presetEnvOpts = {
    targets: get(cli, 'config.settings.build.targets') || defaultTargets,
    // Exclude transforms we don't want
    exclude: [
      '@babel/plugin-transform-typeof-symbol', // makes all code slower https://github.com/facebook/create-react-app/pull/5278
      '@babel/plugin-transform-async-to-generator', // we're using transform-async-to-promises instead
      '@babel/plugin-transform-regenerator'
    ]
  }
  
  const pluginAsyncOpts = {
    inlineHelpers: true
  }

  const babelConfig = {
    // By default Babel assumes all source code is ESM so force it to check for CJS
    sourceType: 'unambiguous',
    presets: [[require.resolve('@babel/preset-env'), presetEnvOpts]],
    plugins: [[require.resolve('babel-plugin-transform-async-to-promises'), pluginAsyncOpts]],
    babelrc: true,
    cacheDirectory: true
  }

  cli.publish(hooks.BABEL_CONFIG, babelConfig)
  cli.publish(hooks.BABEL_PRESET_ENV_OPTIONS, presetEnvOpts)

  return babelConfig
}
