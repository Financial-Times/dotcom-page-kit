import extractPackageName from './extractPackageName'
import createSafeChunkName from './createSafeChunkName'
import DisableTreeShakingForChunk from 'disable-tree-shaking-for-chunk-plugin'

interface IBundleWithPackageNames {
  name: string
  packages: string[]
  disableTreeShaking?: boolean
}

interface IBundleWithRegExp {
  name: string
  pattern: RegExp
  disableTreeShaking?: boolean
}

/**
 * Create a chunk which includes all packages in the given list of names
 */
export function createBundleWithPackages({ name, packages }: IBundleWithPackageNames) {
  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          [name]: {
            name,
            test: (module) => {
              const packageName = extractPackageName(module.context)
              return packageName ? packages.includes(packageName) : false
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
export function createBundleWithRegExp({ name, pattern }: IBundleWithRegExp) {
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
export function createBundlesForPackages({ name, packages }: IBundleWithPackageNames) {
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
          [name]: {
            name(module) {
              const packageName = extractPackageName(module.context)
              const chunkName = createSafeChunkName(packageName)

              // Because we're generating chunk names dynamically we need to append
              // each name to the list of names used by the disable tree-shaking plugin.
              disableTreeShakingPlugin.test.add(chunkName)

              return chunkName
            },
            test(module) {
              const packageName = extractPackageName(module.context)
              return packageName ? packages.includes(packageName) : false
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
export function createBundlesForRegExp({ name, pattern }: IBundleWithRegExp) {
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
          [name]: {
            name(module) {
              const packageName = extractPackageName(module.context)
              const chunkName = createSafeChunkName(packageName)

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
