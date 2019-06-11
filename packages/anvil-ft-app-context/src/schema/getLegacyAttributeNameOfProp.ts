import dashify from 'dashify'
import appContextSchema from './schema.json'

export function getLegacyAttributeNameOfProp(propName: string) {
  const props = appContextSchema.properties

  if (!props[propName]) {
    return asDataAttributeName(propName)
  }

  return props[propName].legacyDataAttributeName || asDataAttributeName(propName)
}

function asDataAttributeName(str: string) {
  return `data-${dashify(str)}`
}
