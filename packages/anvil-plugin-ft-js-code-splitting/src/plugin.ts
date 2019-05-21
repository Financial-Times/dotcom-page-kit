import memoize from 'memoize-one'
import getPackageName from 'get-package-name'

// Memoize calls as modules often need to be resolved many times.
const extractPackageName = memoize((modulePath) => {
  const moduleFolder = modulePath.match(/(node_modules|bower_components)/)
  return moduleFolder ? getPackageName(modulePath, moduleFolder.pop()) : null
})

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
    return createBundlesForPackagesPrefixed('origami', 'o-')
  }

  function addAnvilUiCodeSplitting() {
    return createBundleWithRegExp('anvil-ui', /anvil-ui-/)
  }

  function addBabelRuntimeCodeSplitting() {
    return createBundleWithRegExp('babel-runtime', /@babel\/runtime/)
  }

  function addSharedStableCodeSplitting() {
    return createBundleWithPackageNames('shared.stable', [
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
    return createBundleWithPackageNames('shared.volatile', ['n-syndication', 'n-feedback'])
  }

  function createBundleWithPackageNames(name: string, packageNames: string[]) {
    return {
      optimization: {
        splitChunks: {
          cacheGroups: {
            [name]: {
              test(module) {
                const packageName = extractPackageName(module.context)
                return packageName ? packageNames.includes(packageName) : false
              },
              name,
              enforce: true
            }
          }
        }
      }
    }
  }

  function createBundlesForPackagesPrefixed(group: string, packagePrefix: string) {
    return {
      optimization: {
        splitChunks: {
          cacheGroups: {
            [group]: {
              test(module) {
                const packageName = extractPackageName(module.context)
                return packageName ? packageName.startsWith(packagePrefix) : false
              },
              name(module) {
                return extractPackageName(module.context)
              },
              enforce: true
            }
          }
        }
      }
    }
  }

  function createBundleWithRegExp(name: string, pattern: RegExp) {
    return {
      optimization: {
        splitChunks: {
          cacheGroups: {
            [name]: {
              test: pattern,
              name,
              enforce: true
            }
          }
        }
      }
    }
  }
}
