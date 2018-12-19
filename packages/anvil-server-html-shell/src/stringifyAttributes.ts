export default function stringifyAttributes(object: object): string {
  return Object.entries(object)
    .map(([key, value]) => `${key}="${JSON.stringify(value)}"`)
    .join(' ')
}
