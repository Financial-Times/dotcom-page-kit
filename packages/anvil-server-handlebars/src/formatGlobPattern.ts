export default function formatGlobPatterns(patterns: string[], extension: string): string {
  if (Array.isArray(patterns)) {
    if (patterns.length === 1) {
      return `/${patterns[0]}${extension}`
    } else {
      return `/{${patterns.join()}}${extension}`
    }
  } else {
    throw TypeError(`Patterns must be an array but received "${patterns}"`)
  }
}
