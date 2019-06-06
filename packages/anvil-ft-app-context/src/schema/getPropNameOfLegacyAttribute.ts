import camelCase from 'camelcase'
import appContextSchema from './schema.json'

export function getPropNameOfLegacyDataAttribute(dataAttributeName: string) {
  const props = appContextSchema.properties

  for (let prop of Object.keys(props)) {
    if (props[prop].legacyDataAttributeName === dataAttributeName) {
      return prop
    }
  }

  return camelCase(dataAttributeName.replace('data-', ''))
}
