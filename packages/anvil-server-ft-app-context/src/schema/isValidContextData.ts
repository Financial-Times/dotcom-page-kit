import Ajv from 'ajv'
import schema from './contextDataSchema'

export default function isValidContextData(contextData): boolean {
  const ajv = new Ajv()

  const isValid = ajv.validate(schema, contextData)

  if (isValid) {
    return true
  } else {
    throw Error(`App Context Data Validation Error: ${ajv.errorsText()}`)
  }
}
