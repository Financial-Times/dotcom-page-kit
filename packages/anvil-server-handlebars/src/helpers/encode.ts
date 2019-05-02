import { HelperOptions } from 'handlebars'

export function encode(...args) {
  if (args.length !== 2) {
    throw Error('Incorrect number of parameters provided')
  }

  const options = args.pop() as HelperOptions

  if (options.hash.mode === 'uri') {
    return encodeURI(args[0])
  } else {
    return encodeURIComponent(args[0])
  }
}
