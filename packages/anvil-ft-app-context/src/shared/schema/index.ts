import Ajv from 'ajv'
import dashify from 'dashify'
import camelCase from 'camelcase'
import appContextSchema from './schema.json'
import { AnyObject } from '@financial-times/anvil-types-generic'

export function ensureValidAppContext(appContextData: AnyObject) {
  const ajv = new Ajv()
  const isValid = ajv.validate(appContextSchema, appContextData)

  if (!isValid) {
    throw new Error('App Context Data Validation Error: ' + ajv.errorsText())
  }
}

export function getPropNameOfLegacyDataAttribute(dataAttributeName: string) {
  const props = appContextSchema.properties

  for (let prop of Object.keys(props)) {
    if (props[prop].legacyDataAttributeName === dataAttributeName) {
      return prop
    }
  }

  return camelCase(dataAttributeName.replace('data-', ''))
}

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
