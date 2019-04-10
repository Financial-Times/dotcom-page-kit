import { HelperOptions } from 'handlebars'

export function unlessSome(...args) {
  if (args.length <= 1) {
    throw Error('At least one parameter must be provided')
  }

  const options = args.pop() as HelperOptions
  const unlessSome = !args.every(Boolean)

  return unlessSome ? options.fn(this) : options.inverse(this)
}
