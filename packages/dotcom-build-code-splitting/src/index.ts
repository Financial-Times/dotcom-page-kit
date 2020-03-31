import assignDeep from 'assign-deep'
import ReliableModuleIdsPlugin from 'reliable-module-ids-plugin'
import type webpack from 'webpack'

import {
  createBundleWithPackages,
  createBundleWithRegExp,
  createBundlesForPackages,
  createBundlesForRegExp
} from './bundleTypes'

export class PageKitCodeSplitting {
  apply(compiler: webpack.Compiler) {
    const addInitialCodeSplitting = {
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
      }
    }

    // Split each o-, n-, x- and next- prefixed packages into a separate bundles
    // NOTE: we need to check we're in a package directory as our apps are usually prefixed with "next-"
    const addComponentCodeSplitting = createBundlesForRegExp({
      compiler,
      name: 'shared-components',
      pattern: /(node_modules\/@financial-times|bower_components)\/(o|n|x|next)-/,
      usedInUnknownWay: true
    })

    // split all dotcom-ui- packages into one bundle file
    const addPageKitCodeSplitting = createBundleWithRegExp({
      compiler,
      name: 'page-kit-components',
      pattern: /[\\\/]dotcom-ui-/,
      usedInUnknownWay: true
    })

    // split any of these JS frameworks and libraries into separate bundle files
    const addLibraryCodeSplitting = createBundlesForPackages({
      compiler,
      name: 'js-frameworks',
      packages: ['react', 'preact', 'hyperons', 'dateformat', 'regenerator-runtime']
    })

    // These packages are a dependency of ads, marketing, MyFT, syndication, cookie banners
    // and other components but they are not all dependencies of our apps.
    const addSuperstoreCodeSplitting = createBundleWithPackages({
      compiler,
      name: 'superstore',
      packages: ['superstore', 'superstore-sync'],
      usedInUnknownWay: true
    })

    // split packages used by all pages (i.e. used y Page Kit) into a shared bundle
    const addSharedStableCodeSplitting = createBundleWithPackages({
      compiler,
      name: 'shared.stable',
      packages: [
        'focus-visible',
        'fontfaceobserver',
        'ftdomdelegate',
        'morphdom',
        'n-topic-search',
        'n-ui-foundations',
        'ready-state'
      ],
      usedInUnknownWay: true
    })

    // split packages which are commonly used together around FT.com into a shared bundle
    const addSharedVolatileCodeSplitting = createBundleWithPackages({
      compiler,
      name: 'shared.volatile',
      packages: ['@financial-times/n-ads', '@financial-times/n-tracking', 'n-syndication', 'n-feedback'],
      usedInUnknownWay: true
    })

    new ReliableModuleIdsPlugin().apply(compiler)

    assignDeep(
      compiler.options,
      addInitialCodeSplitting,
      addPageKitCodeSplitting,
      addLibraryCodeSplitting,
      addComponentCodeSplitting,
      addSuperstoreCodeSplitting,
      addSharedStableCodeSplitting,
      addSharedVolatileCodeSplitting
    )
  }
}
