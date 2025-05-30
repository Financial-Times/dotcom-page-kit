import assignDeep from 'assign-deep'
import type webpack from 'webpack'

import {
  createBundleWithPackages,
  createBundleWithRegExp,
  createBundlesForPackages,
  createBundlesForRegExp
} from './bundleTypes'

export class PageKitCodeSplittingPlugin {
  apply(compiler: webpack.Compiler) {
    const addInitialCodeSplitting = {
      optimization: {
        // Creates a separate bundle for webpack runtime.
        // Specifying the name prevents multiple runtime bundles from being created.
        runtimeChunk: {
          name: 'webpack-runtime'
        },
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            defaultVendors: {
              // output a stable name for the defaultVendors chunk in development for testing purposes
              name: compiler.options.mode === 'development' ? 'vendors' : false,
              // setting the config here skips Webpack's defaults, so add them back
              idHint: 'vendors',
              reuseExistingChunk: true,
              test: /[\\/]node_modules[\\/]/i,
              priority: -10
            }
          }
        }
      }
    }

    // Split each o-, n-, x- and next- prefixed packages into a separate bundles
    // NOTE: we need to check we're in a package directory as our apps are usually prefixed with "next-"
    const addComponentCodeSplitting = createBundlesForRegExp({
      compiler,
      name: 'shared-components',
      pattern: /(node_modules\/@financial-times)\/(o|n|x|next)-/,
      usedInUnknownWay: true
    })

    // split all dotcom-ui- packages into one bundle file
    const addPageKitCodeSplittingPlugin = createBundleWithRegExp({
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

    // split all privacy- packages into one bundle file
    const addPrivacyCodeSplitting = createBundleWithRegExp({
      compiler,
      name: 'privacy-components',
      pattern: /@financial-times\/privacy-/,
      usedInUnknownWay: true
    })

    // split packages used by all pages (i.e. used by Page Kit) into a shared bundle
    const addSharedStableCodeSplitting = createBundleWithPackages({
      compiler,
      name: 'shared.stable',
      packages: [
        'focus-visible',
        'fontfaceobserver',
        'ftdomdelegate',
        'morphdom',
        'n-topic-search',
        'ready-state'
      ],
      usedInUnknownWay: true
    })

    // split packages which are commonly used together around FT.com into a shared bundle
    const addSharedVolatileCodeSplitting = createBundleWithPackages({
      compiler,
      name: 'shared.volatile',
      packages: ['@financial-times/n-tracking', '@financial-times/n-syndication'],
      usedInUnknownWay: true
    })

    assignDeep(
      compiler.options,
      addInitialCodeSplitting,
      addPageKitCodeSplittingPlugin,
      addLibraryCodeSplitting,
      addComponentCodeSplitting,
      addSuperstoreCodeSplitting,
      addPrivacyCodeSplitting,
      addSharedStableCodeSplitting,
      addSharedVolatileCodeSplitting
    )
  }
}
