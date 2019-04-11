import { HelperOptions } from 'handlebars'
import querystring from 'querystring'

const host = 'https://www.ft.com/__origami/service/image/v2/images/raw'

const defaults = { source: 'next', fit: 'scale-down' }

export function resize(...args) {
  if (args.length !== 2) {
    throw Error('Incorrect number of parameters provided')
  }

  const options = args.pop() as HelperOptions
  const image = options.fn(this)
  const width = args[0]

  const query = querystring.stringify({ width, ...defaults, ...options.hash })

  return `${host}/${encodeURIComponent(image)}?${query}`
}
