import { HelperOptions } from 'handlebars'

export default function slice(...args) {
  if (args.length !== 2) {
    throw Error('Incorrect number of parameters provided')
  }

  const options = args.pop() as HelperOptions

  const offset = parseInt(options.hash.offset, 10) || 0
  const limit = parseInt(options.hash.limit, 10) || 1

  const slicedItems = Array.from(args[0]).slice(offset, offset + limit)

  let contents = ''

  slicedItems.forEach((item) => {
    contents += options.fn(item)
  })

  return contents
}
