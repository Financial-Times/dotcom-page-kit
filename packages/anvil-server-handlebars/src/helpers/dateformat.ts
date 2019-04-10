import dateformat from 'dateformat'
import { HelperOptions } from 'handlebars'

export default function(format: string, options: HelperOptions) {
  if (arguments.length === 1) {
    options = (format as unknown) as HelperOptions
    format = 'isoUtcDateTime'
  }

  return dateformat(options.fn(this), format)
}
