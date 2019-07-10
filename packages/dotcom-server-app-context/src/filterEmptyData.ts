const isEmptyString = (value) => typeof value === 'string' && value.trim().length === 0

const isDefined = (value) => value !== undefined && value !== null

type AnyObject = {
  [key: string]: any
}

export default function filterEmptyProperties(properties: AnyObject): AnyObject {
  const result = {}

  for (const [key, value] of Object.entries(properties)) {
    if (isDefined(value) && !isEmptyString(value)) {
      result[key] = value
    }
  }

  return result
}
