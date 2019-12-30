import formatter from 'dateformat'
import { HelperOptions } from 'handlebars'

export default function dateformat(...args) {
  if (args.length > 2) {
    throw Error('Incorrect number of parameters provided')
  }

  const options = args.pop() as HelperOptions
  const format = args[0] || 'isoUtcDateTime'

  return formatter(options.fn(this), format)
}
