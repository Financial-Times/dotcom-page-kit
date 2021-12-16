import memoize from 'memoize-one'
import getPackageName from 'get-package-name'

const moduleType = /(node_modules)/

function extractPackageName(modulePath: string) {
  const type = modulePath.match(moduleType)
  return Array.isArray(type) ? getPackageName(modulePath, type[type.length - 1]) : null
}

// Memoize these calls as modules often need to be resolved many times.
export default memoize(extractPackageName)
