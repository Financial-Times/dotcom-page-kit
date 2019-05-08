export function plugin() {
  return ({ on }) => {
    on('webpackConfig', addVendorBundleSplitting)
    on('webpackConfig', addOrigamiBundleSplitting)
    on('webpackConfig', addAnvilUiBundleSplitting)
    on('webpackConfig', addSharedStableBundleSplitting)
    on('webpackConfig', addSharedVolatileBundleSplitting)
  }

  function addVendorBundleSplitting() {
    return {
      optimization: {
        splitChunks: {
          chunks: 'all',
          name: 'vendor'
        }
      }
    }
  }

  function addOrigamiBundleSplitting() {
    return createSplitByPackagePrefixConfig('origami', 'o-')
  }

  function addAnvilUiBundleSplitting() {
    return createSplitByPackagePrefixConfig('anvil-ui', 'anvil-ui-')
  }

  function addSharedStableBundleSplitting() {
    return createSharedBundleSplittingConfig('shared.stable', [
      'dom-loaded',
      'superstore',
      'superstore-sync',
      'n-ui-foundations'
    ])
  }

  function addSharedVolatileBundleSplitting() {
    return createSharedBundleSplittingConfig('shared.volatile', ['n-syndication', 'n-feedback'])
  }

  function createSharedBundleSplittingConfig(name: string, packagesToInclude: string[]) {
    return {
      optimization: {
        // Creates a separate bundle for webpack runtime.
        // Specifying the name prevents multiple runtime bundles from being created.
        runtimeChunk: {
          name: 'runtime'
        },
        splitChunks: {
          cacheGroups: {
            [name]: {
              test: (module) => {
                const match = module.context.match(/\bnode_modules|bower_components\/([^\/]+)\b/)
                if (!match) return false
                return packagesToInclude.includes(match[1])
              },
              chunks: 'all',
              minSize: 0,
              maxInitialRequests: Infinity,
              name
            }
          }
        }
      }
    }
  }

  function createSplitByPackagePrefixConfig(group: string, packagePrefix: string) {
    return {
      optimization: {
        splitChunks: {
          cacheGroups: {
            [group]: {
              test: new RegExp(`\\b(${packagePrefix}[^\/]+)\\b`),
              chunks: 'all',
              minSize: 0,
              maxInitialRequests: Infinity,
              name(module) {
                return module.context.match(new RegExp(`\\b(${packagePrefix}[^\/]+)\\b`))[0]
              }
            }
          }
        }
      }
    }
  }
}
