export type TAttributeData = {
  [key: string]: string | number | boolean
}

export type TOptions = {
  prefix?: string
}

export default function formatAttributeNames(data: TAttributeData = {}, options: TOptions = {}) {
  const output = {}

  for (const [key, value] of Object.entries(data)) {
    let hyphenatedKey = hyphenateString(key)

    if (options.prefix) {
      hyphenatedKey = `${options.prefix}-${hyphenatedKey}`
    }

    output[hyphenatedKey] = value
  }

  return output
}

function hyphenateChar(char) {
  return '-' + char.toLowerCase()
}

function hyphenateString(prop) {
  return prop.replace(/([A-Z])/g, hyphenateChar)
}
