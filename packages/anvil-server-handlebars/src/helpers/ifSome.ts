import { HelperOptions } from 'handlebars'

export function ifSome(...args) {
  if (args.length < 2) {
    throw Error('At least one parameter must be provided')
  }

  const options = args.pop() as HelperOptions
  const ifSome = args.some(Boolean)

  return ifSome ? options.fn(this) : options.inverse(this)
}
