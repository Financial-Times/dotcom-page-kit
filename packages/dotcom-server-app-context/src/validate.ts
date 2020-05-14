import Ajv from 'ajv'
import schema from './schema.json'

const ajv = new Ajv()

const isValid = ajv.compile(schema)

export default function validate(field: string, value): boolean {
  const data = { [field]: value }

  if (isValid(data)) {
    return true
  } else {
    let errorMessage = `Validation error: ${ajv.errorsText(isValid.errors)}, received "${value}"`
    const hasErrorsForAdditionProperties = isValid.errors.some(
      (error) => error.keyword === 'additionalProperties'
    )
    if (hasErrorsForAdditionProperties) {
      errorMessage +=
        '\nIf you want to share application specific data with the client, consider using @financial-times/dotcom-ui-data-embed.'
    }
    throw Error(errorMessage)
  }
}
