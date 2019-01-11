// The Babel configuration is inspired by  create-react-app Babel preset which is a very popular
// and (we hope) reliable configuration:
// <https://github.com/facebook/create-react-app/blob/master/packages/babel-preset-react-app/create.js>

import { Plugin } from 'adonai'
import { RunningWebpackContext } from '@financial-times/anvil-types-build'

interface PluginSettings {
  /**
   * A Browserslist compatible query describing the targets for your project
   * https://babeljs.io/docs/en/babel-preset-env#targets
   */
  targets: string | { [key: string]: string }
}

const defaultSettings: PluginSettings = {
  targets: '> 1%, ie 11, bb 10, ff ESR'
}

export default new Plugin(({ on }) => {
  on('@Build::amend::webpackConfig', amendWebpackConfig)
})

function amendWebpackConfig({ context, webpackConfig }: RunningWebpackContext) {
  const userSettings = context.config.settings && context.config.settings.esnext
  const settings = { ...defaultSettings, ...userSettings }

  const presetEnvOptions = {
    targets: settings.targets,
    useBuiltIns: false,
    // Exclude transforms that make all code slower
    exclude: ['transform-typeof-symbol']
  }

  const pluginTransformRuntimeOptions = {
    corejs: false,
    helpers: true,
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
