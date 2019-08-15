import Ajv from 'ajv'
import schema from './schema.json'

const ajv = new Ajv()

const isValid = ajv.compile(schema)

export default function validate(field: string, value): boolean {
  const data = { [field]: value }

  if (isValid(data)) {
    return true
  } else {
    throw Error(`Validation error: ${ajv.errorsText(isValid.errors)}`)
  }
}
