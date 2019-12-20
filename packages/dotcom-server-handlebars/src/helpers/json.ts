export default function json(...args) {
  if (args.length !== 2) {
    throw Error('Incorrect number of parameters provided')
  }

  // The second parameter will always be an instance of HelperOptions
  const target = args[0]

  // Do not allow users to output the whole @root context
  // <https://github.com/Financial-Times/n-handlebars/pull/65>
  if (target && target.hasOwnProperty('_locals')) {
    throw Error('For security reasons you may not use the JSON helper to output the entire view context')
  }

  return JSON.stringify(target)
}
