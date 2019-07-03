export function array(...args) {
  if (args.length < 2) {
    throw Error('At least one parameter must be provided')
  }

  // The final parameter will always be an instance of HelperOptions
  return args.slice(0, -1)
}
