import { HelperOptions } from 'handlebars'

export function ifAll(...args) {
  const options = args.pop() as HelperOptions
  return args.every(Boolean) ? options.fn(this) : options.inverse(this)
}
