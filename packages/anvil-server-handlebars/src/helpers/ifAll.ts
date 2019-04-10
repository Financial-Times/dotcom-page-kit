import { HelperOptions } from 'handlebars'

export function ifAll(...args) {
  if (args.length < 2) {
    throw Error('At least one parameter must be provided')
  }

  const options = args.pop() as HelperOptions
  const ifAll = args.every(Boolean)

  return ifAll ? options.fn(this) : options.inverse(this)
}
