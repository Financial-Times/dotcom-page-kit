import { HelperOptions } from 'handlebars'

export default function ifAll(...args) {
  if (args.length < 2) {
    throw Error('At least one parameter must be provided')
  }

  const options = args.pop() as HelperOptions
  const condition = args.every(Boolean)

  return condition ? options.fn(this) : options.inverse(this)
}
