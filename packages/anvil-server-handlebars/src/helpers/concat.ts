export function concat(...args) {
  if (args.length < 3) {
    throw Error('At least two parameters must be provided')
  }

  return args.slice(0, -1).join('')
}
