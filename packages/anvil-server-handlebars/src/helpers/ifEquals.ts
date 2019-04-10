import { HelperOptions } from 'handlebars'

export function ifEquals(...args) {
  if (args.length !== 3) {
    throw Error('Incorrect number of parameters provided')
  }

  const options = args.pop() as HelperOptions
  const ifEquals = args.every((item) => item === args[0])

  return ifEquals ? options.fn(this) : options.inverse(this)
}
