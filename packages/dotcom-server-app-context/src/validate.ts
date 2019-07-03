import Ajv from 'ajv'
import schema from './schema.json'

const ajv = new Ajv()

const isValid = ajv.compile(schema)

export default function validate(contextData): boolean {
  if (isValid(contextData)) {
    return true
  } else {
    throw Error(`Validation error: ${ajv.errorsText(isValid.errors)}`)
  }
}
