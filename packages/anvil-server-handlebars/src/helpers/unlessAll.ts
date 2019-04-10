import { HelperOptions } from 'handlebars'

export function unlessAll(...args) {
  if (args.length < 2) {
    throw Error('At least one parameter must be provided')
  }

  const options = args.pop() as HelperOptions
  const unlessAll = !args.some(Boolean)

  return unlessAll ? options.fn(this) : options.inverse(this)
}
