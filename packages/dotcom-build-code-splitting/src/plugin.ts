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
    on(hooks.WEBPACK_CONFIG, addPageKitCodeSplitting)
    on(hooks.WEBPACK_CONFIG, addLibraryCodeSplitting)
    on(hooks.WEBPACK_CONFIG, addComponentCodeSplitting)
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

  function addComponentCodeSplitting() {
    // Split each n-, x-, and o- package into a separate bundle files
    return createBundlesForRegExp('shared-components', /[\\\/](x|o)-/)
  }

  function addPageKitCodeSplitting() {
    // split all dotcom-ui- packages into one bundle file
    return createBundleWithRegExp('page-kit-components', /[\\\/]dotcom-ui-/)
  }

  function addBabelRuntimeCodeSplitting() {
    // split all Babel shared helpers into one bundle file
    return createBundlesForPackages('babel-helpers', ['@babel/runtime', 'regenerator-runtime'])
  }

  function addLibraryCodeSplitting() {
    // split any of these JS frameworks and libraries into separate bundle files
    return createBundlesForPackages('js-frameworks', ['react', 'preact', 'hyperons', 'dateformat'])
  }

  function addSharedStableCodeSplitting() {
    // split packages used by all pages (i.e. used by Page Kit) into a shared bundle 
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
    // split packages which are commonly used together around FT.com into a shared bundle
    return createBundleWithPackages('shared.volatile', [
      '@financial-times/n-ads',
      '@financial-times/n-tracking',
      'formdata-polyfill',
      'n-syndication',
      'n-feedback'
    ])
  }
}
