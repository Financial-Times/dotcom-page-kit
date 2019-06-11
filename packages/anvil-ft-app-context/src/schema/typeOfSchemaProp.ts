import schema from './schema.json'

export function typeOfSchemaProp(propName: string) {
  return schema.properties[propName].type
}
