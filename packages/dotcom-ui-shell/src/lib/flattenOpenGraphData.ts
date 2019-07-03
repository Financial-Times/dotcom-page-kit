// Flattens a nested object into an array of key/value pairs
// { foo: { bar: { baz: 123 } } } => [['foo:bar:baz', 123]]

export type TOpenGraphData = {
  [key: string]: any | any[] | TOpenGraphData
}

export default function flattenData(data: TOpenGraphData, prefix?: string): Array<string[]> {
  const output = []

  for (const [key, value] of Object.entries(data)) {
    const property = prefix ? `${prefix}:${key}` : key

    if (value && value.constructor === Object) {
      output.push(...flattenData(value, property))
    } else if (Array.isArray(value)) {
      output.push(...value.map((value) => [property, value]))
    } else {
      output.push([property, value])
    }
  }

  return output
}
