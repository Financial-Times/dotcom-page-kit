import { HelperOptions } from 'handlebars'

export default function ifEqualsSome(...args) {
  if (args.length < 4) {
    throw Error('At least three parameters must be provided')
  }

  const options = args.pop() as HelperOptions
  const control = args.shift()
  const condition = args.some((item) => item === control)

  return condition ? options.fn(this) : options.inverse(this)
}
