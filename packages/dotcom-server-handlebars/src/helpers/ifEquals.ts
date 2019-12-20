import { HelperOptions } from 'handlebars'

export default function ifEquals(...args) {
  if (args.length < 3) {
    throw Error('At least two parameters must be provided')
  }

  const options = args.pop() as HelperOptions
  const condition = args.every((item) => item === args[0])

  return condition ? options.fn(this) : options.inverse(this)
}
