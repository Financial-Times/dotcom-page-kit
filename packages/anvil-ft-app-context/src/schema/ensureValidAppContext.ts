import Ajv from 'ajv'
import appContextSchema from './schema.json'
import { AnyObject } from '@financial-times/anvil-types-generic'

export function ensureValidAppContext(appContextData: AnyObject) {
  const ajv = new Ajv()
  const isValid = ajv.validate(appContextSchema, appContextData)

  if (!isValid) {
    throw new Error('App Context Data Validation Error: ' + ajv.errorsText())
  }
}
