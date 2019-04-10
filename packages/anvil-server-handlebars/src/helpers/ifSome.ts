import { HelperOptions } from 'handlebars'

export function ifSome(...args) {
  const options = args.pop() as HelperOptions
  return args.some(Boolean) ? options.fn(this) : options.inverse(this)
}
