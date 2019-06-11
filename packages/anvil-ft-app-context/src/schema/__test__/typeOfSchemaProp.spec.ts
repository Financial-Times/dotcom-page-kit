import schema from '../schema.json'
import { typeOfSchemaProp } from '../typeOfSchemaProp'

describe('typeOfSchemaProp()', () => {
  it('returns the `type` of the property as defined within the schema', () => {
    expect(typeOfSchemaProp('appName')).toBe(schema.properties.appName.type)
    expect(typeOfSchemaProp('isProduction')).toBe(schema.properties.isProduction.type)
  })
})
