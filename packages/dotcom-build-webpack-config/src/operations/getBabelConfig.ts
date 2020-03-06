import { hooks } from '../entities/hooks'
import { ConfigContext } from '../entities/ConfigContext'

export function getBabelConfig({ publish }: ConfigContext) {
  const presetEnvOpts = {
    targets: [
      'last 2 Chrome versions',
      'ie 11',
      'Safari >= 9.1',
      'ff ESR',
      'last 2 Edge versions'
    ],
    // Exclude transforms that make all code slower
    // See https://github.com/facebook/create-react-app/pull/5278
    exclude: ['transform-typeof-symbol']
  }

  const babelConfig = {
    // By default Babel assumes all source code is ESM so force it to check for CJS
    sourceType: 'unambiguous',
    presets: [[require.resolve('@babel/preset-env'), presetEnvOpts]],
    plugins: [],
    babelrc: true,
    cacheDirectory: true
  }

  publish(hooks.BABEL_CONFIG, babelConfig)
  publish(hooks.BABEL_PRESET_ENV_OPTIONS, presetEnvOpts)

  return babelConfig
}
