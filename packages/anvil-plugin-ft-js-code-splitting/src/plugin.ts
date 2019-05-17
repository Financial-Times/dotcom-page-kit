export function plugin() {
  return ({ on }) => {
    on('webpackConfig', addVendorCodeSplitting)
    on('webpackConfig', addOrigamiCodeSplitting)
    on('webpackConfig', addAnvilUiCodeSplitting)
    on('webpackConfig', addBabelRuntimeCodeSplitting)
    on('webpackConfig', addSharedStableCodeSplitting)
    on('webpackConfig', addSharedVolatileCodeSplitting)
  }

  function addVendorCodeSplitting() {
    return {
      optimization: {
        // Creates a separate bundle for webpack runtime.
        // Specifying the name prevents multiple runtime bundles from being created.
        runtimeChunk: {
          name: 'webpack-runtime'
        },
        splitChunks: {
          chunks: 'all',
          name: 'vendor'
        }
      }
    }
  }

  function addOrigamiCodeSplitting() {
    return createSplitByPackagePrefixConfig('origami', 'o-')
  }

  function addAnvilUiCodeSplitting() {
    return createBundleByRegExp('anvil-ui', /anvil-ui-/)
  }

  function addBabelRuntimeCodeSplitting() {
    return createBundleByRegExp('babel-runtime', /@babel\/runtime/)
  }

  function addSharedStableCodeSplitting() {
    return createSharedCodeSplittingConfig('shared.stable', [
      'dom-loaded',
      'ftdomdelegate',
      'morphdom',
      'n-topic-search',
      'n-ui-foundations',
      'superstore',
      'superstore-sync'
    ])
  }

  function addSharedVolatileCodeSplitting() {
    return createSharedCodeSplittingConfig('shared.volatile', ['n-syndication', 'n-feedback'])
  }

  function createSharedCodeSplittingConfig(name: string, packagesToInclude: string[]) {
    return {
      optimization: {
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

  function createBundleByRegExp(name: string, pattern: RegExp) {
    return {
      optimization: {
        splitChunks: {
          cacheGroups: {
            [name]: {
              test: pattern,
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
}
