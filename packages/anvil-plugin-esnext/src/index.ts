import { Plugin } from 'adonai'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

// The Babel configuration is inspired by  create-react-app Babel preset which is a very popular
// and (we hope) reliable configuration:
// <https://github.com/facebook/create-react-app/blob/master/packages/babel-preset-react-app/create.js>
function amendWebpackConfig({ context, webpackConfig }: RunningWebpackContext) {
  const presetEnvOptions = {
    // TODO: make configurable via setting
    targets: '> 1%, ie 11, bb 10',
    useBuiltIns: false,
    // Exclude transforms that make all code slower
    exclude: ['transform-typeof-symbol']
  }

  const pluginTransformRuntimeOptions = {
    corejs: false,
    helpers: true,
    // TODO: make configurable via setting
    regenerator: true
  }

  const babelLoaderOptions = {
    cacheDirectory: true,
    presets: [[require.resolve('@babel/preset-env'), presetEnvOptions]],
    plugins: [
      // Polyfills the runtime needed for async/await, generators, and friends
      [require.resolve('@babel/plugin-transform-runtime'), pluginTransformRuntimeOptions]
    ]
  }

  const rule = {
    test: /\.(js|mjs)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: require.resolve('babel-loader'),
      options: babelLoaderOptions
    }
  }

  context.amend('webpackConfig::esnextPlugin::presetEnvOptions', presetEnvOptions)
  context.amend('webpackConfig::esnextPlugin::pluginTransformRuntimeOptions', pluginTransformRuntimeOptions)
  context.amend('webpackConfig::esnextPlugin::babelLoaderOptions', babelLoaderOptions)
  context.amend('webpackConfig::esnextPlugin::rule', rule)

  webpackConfig.module.rules.push(rule)
}
