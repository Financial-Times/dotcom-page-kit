import memoize from 'memoize-one'
import getPackageName from 'get-package-name'

// Memoize these calls as modules often need to be resolved many times.
const extractPackageName = memoize((modulePath: string) => {
  const type = modulePath.match(/(node_modules|bower_components)/)
  return type ? getPackageName(modulePath, type[type.length - 1]) : null
})

const createSafeFileName = (moduleName: string) => {
  // Remove or replace any non-safe filename characters
  return moduleName.replace('@', '').replace('/', '-')
}

/**
 * Create a single bundle which includes all packages in the given list
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
 * Create a single bundle which includes all packages which match the given pattern
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
 * Create individual bundles for each package in the given list
 */
export function createBundlesForPackages(group: string, packageNames: string[]) {
  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          [group]: {
            name: (module) => {
              const packageName = extractPackageName(module.context)
              return createSafeFileName(packageName)
            },
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
 * Create individual bundles for each package which matches the given pattern
 */
export function createBundlesForRegExp(group: string, pattern: RegExp) {
  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          [group]: {
            name: (module) => {
              const packageName = extractPackageName(module.context)
              return createSafeFileName(packageName)
            },
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
