import { hooks } from '@financial-times/dotcom-page-kit-cli'
import ReliableModuleIdsPlugin from 'reliable-module-ids-plugin'

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
    on(hooks.WEBPACK_CONFIG, addSuperstoreCodeSplitting)
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
        },
        // We're going to implement our own algorithm so don't double effort
        moduleIds: false,
        chunkIds: 'named'
      },
      plugins: [new ReliableModuleIdsPlugin()]
    }
  }

  function addComponentCodeSplitting() {
    // Split each o-, n-, x- and next- prefixed packages into a separate bundles
    // NOTE: we need to check we're in a package directory as our apps are usually prefixed with "next-"
    return createBundlesForRegExp(
      'shared-components',
      /(node_modules\/@financial-times|bower_components)\/(o|n|x|next)-/
    )
  }

  function addPageKitCodeSplitting() {
    // split all dotcom-ui- packages into one bundle file
    return createBundleWithRegExp('page-kit-components', /[\\\/]dotcom-ui-/)
  }

  function addLibraryCodeSplitting() {
    // split any of these JS frameworks and libraries into separate bundle files
    return createBundlesForPackages('js-frameworks', [
      'react',
      'preact',
      'hyperons',
      'dateformat',
      'regenerator-runtime'
    ])
  }

  function addSuperstoreCodeSplitting() {
    // These packages are a dependency of by ads, marketing, MyFT, syndication, cookie banners
    // and other components but these are not all direct dependencies of our apps.
    return createBundlesForPackages('superstore', ['superstore', 'superstore-sync'])
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
      'n-ui-foundations'
    ])
  }

  function addSharedVolatileCodeSplitting() {
    // split packages which are commonly used together around FT.com into a shared bundle
    return createBundleWithPackages('shared.volatile', [
      '@financial-times/n-ads',
      '@financial-times/n-tracking',
      'n-syndication',
      'n-feedback'
    ])
  }
}
