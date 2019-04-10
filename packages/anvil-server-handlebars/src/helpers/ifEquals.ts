import { HelperOptions } from 'handlebars'

export function ifEquals(a, b, options: HelperOptions) {
  return a === b ? options.fn(this) : options.inverse(this)
}
