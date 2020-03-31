import extractPackageName from './extractPackageName'
import createSafeChunkName from './createSafeChunkName'
import DisableTreeShakingForChunk from 'disable-tree-shaking-for-chunk-plugin'
import type webpack from 'webpack'

interface IBundleWithPackageNames {
  compiler: webpack.Compiler
  name: string
  packages: string[]
  // This prevents the tracking of named exports and their usage
  usedInUnknownWay?: boolean
}

interface IBundleWithRegExp {
  compiler: webpack.Compiler
  name: string
  pattern: RegExp
  // This prevents the tracking of named exports and their usage
  usedInUnknownWay?: boolean
}

const isJS = (module) => module.type && module.type.startsWith('javascript/')

/**
 * Create a chunk which includes all packages in the given list of names
 */
export function createBundleWithPackages({
  compiler,
  name,
  packages,
  usedInUnknownWay
}: IBundleWithPackageNames) {
  if (usedInUnknownWay) {
    const disableTreeShakingPlugin = new DisableTreeShakingForChunk({
      test: name
    })

    disableTreeShakingPlugin.apply(compiler)
  }

  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          [name]: {
            name,
            test: (module) => {
              const packageName = isJS(module) && extractPackageName(module.context)
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
export function createBundleWithRegExp({ compiler, name, pattern, usedInUnknownWay }: IBundleWithRegExp) {
  if (usedInUnknownWay) {
    const disableTreeShakingPlugin = new DisableTreeShakingForChunk({
      test: name
    })

    disableTreeShakingPlugin.apply(compiler)
  }

  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          [name]: {
            name,
            test: (module) => {
              return isJS(module) && pattern.test(module.context)
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
export function createBundlesForPackages({
  compiler,
  name,
  packages,
  usedInUnknownWay
}: IBundleWithPackageNames) {
  const generatedChunkNames = new Set()

  if (usedInUnknownWay) {
    const disableTreeShakingPlugin = new DisableTreeShakingForChunk({
      test: generatedChunkNames
    })

    disableTreeShakingPlugin.apply(compiler)
  }

  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          [name]: {
            name(module) {
              const packageName = extractPackageName(module.context)
              const chunkName = createSafeChunkName(packageName)

              generatedChunkNames.add(chunkName)

              return chunkName
            },
            test(module) {
              const packageName = isJS(module) && extractPackageName(module.context)
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
export function createBundlesForRegExp({ compiler, name, pattern, usedInUnknownWay }: IBundleWithRegExp) {
  const generatedChunkNames = new Set()

  if (usedInUnknownWay) {
    const disableTreeShakingPlugin = new DisableTreeShakingForChunk({
      test: generatedChunkNames
    })

    disableTreeShakingPlugin.apply(compiler)
  }

  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          [name]: {
            name(module) {
              const packageName = extractPackageName(module.context)
              const chunkName = createSafeChunkName(packageName)

              generatedChunkNames.add(chunkName)

              return chunkName
            },
            test(module) {
              return isJS(module) && pattern.test(module.context)
            },
            enforce: true
          }
        }
      }
    }
  }
}
