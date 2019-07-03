import { HelperOptions } from 'handlebars'

export function unlessAll(...args) {
  if (args.length < 2) {
    throw Error('At least one parameter must be provided')
  }

  const options = args.pop() as HelperOptions
  const condition = args.some(Boolean) === false

  return condition ? options.fn(this) : options.inverse(this)
}
