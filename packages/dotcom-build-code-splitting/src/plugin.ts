import { hooks } from '@financial-times/dotcom-page-kit-cli'

import {
  createBundleWithPackages,
  createBundleWithRegExp,
  createBundlesForPackages,
  createBundlesForRegExp
} from './bundleTypes'

export function plugin() {
  return ({ on }) => {
    on(hooks.WEBPACK_CONFIG, addInitialCodeSplitting)
    on(hooks.WEBPACK_CONFIG, addOrigamiCodeSplitting)
    on(hooks.WEBPACK_CONFIG, addPageKitCodeSplitting)
    on(hooks.WEBPACK_CONFIG, addBabelRuntimeCodeSplitting)
    on(hooks.WEBPACK_CONFIG, addSharedStableCodeSplitting)
    on(hooks.WEBPACK_CONFIG, addSharedVolatileCodeSplitting)
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

  function addPageKitCodeSplitting() {
    return createBundleWithRegExp('page-kit-components', /[\\\/]dotcom-ui-/)
  }

  function addBabelRuntimeCodeSplitting() {
    return createBundlesForPackages('babel-helpers', ['@babel/runtime', 'regenerator-runtime'])
  }

  function addFrameworkCodeSplitting() {
    return createBundlesForPackages('frameworks', ['react', 'preact'])
  }

  function addSharedStableCodeSplitting() {
    return createBundleWithPackages('shared.stable', [
      'dom-loaded',
      'focus-visible',
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
    return createBundleWithPackages('shared.volatile', [
      '@financial-times/n-ads',
      '@financial-times/n-tracking',
      'n-syndication',
      'n-feedback'
    ])
  }
}
