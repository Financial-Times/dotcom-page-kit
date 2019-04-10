import { HelperOptions } from 'handlebars'

const host = 'https://www.ft.com/__origami/service/image/v2/images/raw'

export function resize(...args) {
  if (args.length !== 2) {
    throw new Error('Incorrect number of parameters provided')
  }

  const options = args.pop() as HelperOptions
  const url = encodeURIComponent(options.fn(this))

  return `${host}/${url}?width=${args[0]}&source=next&fit=scale-down`
}
