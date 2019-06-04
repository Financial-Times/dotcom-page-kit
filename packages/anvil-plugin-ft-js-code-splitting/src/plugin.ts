import {
  createBundleWithPackages,
  createBundleWithRegExp,
  createBundlesForPackages,
  createBundlesForRegExp
} from './bundleTypes'

export function plugin() {
  return ({ on }) => {
    on('webpackConfig', addInitialCodeSplitting)
    on('webpackConfig', addOrigamiCodeSplitting)
    on('webpackConfig', addAnvilUICodeSplitting)
    on('webpackConfig', addBabelRuntimeCodeSplitting)
    on('webpackConfig', addSharedStableCodeSplitting)
    on('webpackConfig', addSharedVolatileCodeSplitting)
  }

  function addInitialCodeSplitting() {
    return {
      optimization: {
        // Creates a separate bundle for webpack runtime.
        // Specifying the name prevents multiple runtime bundles from being created.
        runtimeChunk: {
          name: 'webpack-runtime'
        },
        splitChunks: {
          chunks: 'all'
        }
      }
    }
  }

  function addOrigamiCodeSplitting() {
    return createBundlesForRegExp('origami-components', /[\\\/]o-/)
  }

  function addAnvilUICodeSplitting() {
    return createBundleWithRegExp('anvil-ui', /[\\\/]anvil-ui-/)
  }

  function addBabelRuntimeCodeSplitting() {
    return createBundlesForPackages('babel-helpers', ['@babel/runtime'])
  }

  function addSharedStableCodeSplitting() {
    return createBundleWithPackages('shared.stable', [
      'dom-loaded',
      'fontfaceobserver',
      'ftdomdelegate',
      'morphdom',
      'n-topic-search',
      'n-ui-foundations',
      'superstore',
      'superstore-sync'
    ])
  }

  function addSharedVolatileCodeSplitting() {
    return createBundleWithPackages('shared.volatile', ['n-syndication', 'n-feedback'])
  }
}
