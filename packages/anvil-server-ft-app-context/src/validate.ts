import Ajv from 'ajv'
import schema from './schema'

const ajv = new Ajv()

const isValid = ajv.compile(schema)

export default function validate(contextData): boolean {
  if (isValid(contextData)) {
    return true
  } else {
    throw Error(`App context data validation Error: ${ajv.errorsText(isValid.errors)}`)
  }
}
