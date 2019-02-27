import React from 'react'

export interface TOpenGraphObject {
  [key: string]: any | any[] | TOpenGraphObject
}

export interface TOpenGraphProps {
  openGraph: TOpenGraphObject
}

export default ({ openGraph }: TOpenGraphProps) => (
  <React.Fragment>
    {flattenData(openGraph).map(([property, content], i) => (
      <meta key={`og-${i}`} property={property} content={content} />
    ))}
  </React.Fragment>
)

// Flattens a nested object into an array of key/value pairs
// { foo: { bar: { baz: 123 } } } => [['foo:bar:baz', 123]]
function flattenData(data, prefix?): Array<string[]> {
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
