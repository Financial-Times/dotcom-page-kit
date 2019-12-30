export default function concat(...args) {
  if (args.length < 3) {
    throw Error('At least two parameters must be provided')
  }

  // The final parameter will always be an intance of HelperOptions
  return args.slice(0, -1).join('')
}
