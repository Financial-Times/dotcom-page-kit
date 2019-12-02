import memoize from 'memoize-one'
import getPackageName from 'get-package-name'
import DisableTreeShakingForChunk from 'disable-tree-shaking-for-chunk-plugin'

// Memoize these calls as modules often need to be resolved many times.
const extractPackageName = memoize((modulePath: string) => {
  const type = modulePath.match(/(node_modules|bower_components)/)
  return type ? getPackageName(modulePath, type[type.length - 1]) : null
})

const createChunkName = (moduleName: string) => {
  // Remove or replace any non-safe filename characters
  return moduleName.replace('@', '').replace('/', '-')
}

/**
 * Create a chunk which includes all packages in the given list of names
 */
export function createBundleWithPackages(name: string, packageNames: string[]) {
  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          [name]: {
            name,
            test: (module) => {
              const packageName = extractPackageName(module.context)
              return packageName ? packageNames.includes(packageName) : false
            },
            enforce: true
          }
        }
      }
    }
  }
}

/**
 * Create a chunk which includes all modules which match the given pattern
 */
export function createBundleWithRegExp(name: string, pattern: RegExp) {
  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          [name]: {
            name,
            test: (module) => {
              return pattern.test(module.context)
            },
            enforce: true
          }
        }
      }
    }
  }
}

/**
 * Create a chunk for each package in the given list of names
 */
export function createBundlesForPackages(group: string, packageNames: string[]) {
  // Because we want these individual chunks to be reused between apps as much
  // as possible we're disabling tree shaking to maximise the chance of apps
  // generating identical files and content hashes.
  const disableTreeShakingPlugin = new DisableTreeShakingForChunk({
    test: new Set()
  })

  return {
    plugins: [disableTreeShakingPlugin],
    optimization: {
      splitChunks: {
        cacheGroups: {
          [group]: {
            name(module) {
              const packageName = extractPackageName(module.context)
              const chunkName = createChunkName(packageName)

              // Because we're generating chunk names dynamically we need to append
              // each name to the list of names used by the disable tree-shaking plugin.
              disableTreeShakingPlugin.test.add(chunkName)

              return chunkName
            },
            test(module) {
              const packageName = extractPackageName(module.context)
              return packageName ? packageNames.includes(packageName) : false
            },
            enforce: true
          }
        }
      }
    }
  }
}

/**
 * Create a chunk for each group of modules which match the given pattern
 */
export function createBundlesForRegExp(group: string, pattern: RegExp) {
  // Because we want these individual chunks to be reused between apps as much
  // as possible we're disabling tree shaking to maximise the chance of apps
  // generating identical files and content hashes.
  const disableTreeShakingPlugin = new DisableTreeShakingForChunk({
    test: new Set()
  })

  return {
    plugins: [disableTreeShakingPlugin],
    optimization: {
      splitChunks: {
        cacheGroups: {
          [group]: {
            name(module) {
              const packageName = extractPackageName(module.context)
              const chunkName = createChunkName(packageName)

              // Because we're generating chunk names dynamically we need to append
              // each name to the list of names used by the disable tree-shaking plugin.
              disableTreeShakingPlugin.test.add(chunkName)

              return chunkName
            },
            test(module) {
              return pattern.test(module.context)
            },
            enforce: true
          }
        }
      }
    }
  }
}
