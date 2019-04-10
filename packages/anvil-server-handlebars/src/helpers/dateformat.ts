import formatter from 'dateformat'
import { HelperOptions } from 'handlebars'

export function dateformat(format: string, options: HelperOptions) {
  if (arguments.length === 1) {
    options = (format as unknown) as HelperOptions
    format = 'isoUtcDateTime'
  }

  return formatter(options.fn(this), format)
}
