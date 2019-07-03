export type TAttributeData = {
  [key: string]: string | number | boolean
}

export default function formatAttributeNames(data: TAttributeData = {}) {
  const output = {}

  for (const [key, value] of Object.entries(data)) {
    const hyphenatedKey = hyphenateString(key)

    // Let's render boolean data attributes properly
    // as per https://github.com/Financial-Times/anvil/issues/370
    if (hyphenatedKey.startsWith('data-') && typeof value === 'boolean') {
      // Where react is concerned, a `true` boolean data attribute
      // is one where the attribute value is an empty string (because
      // it is not possible to render an attribute without a value),
      // and a `false` boolean data attribute is one where the attribute
      // has not been specified altogether
      if (value) {
        output[hyphenatedKey] = ''
      }
    } else {
      output[hyphenatedKey] = value
    }
  }

  return output
}

function hyphenateChar(char) {
  return '-' + char.toLowerCase()
}

function hyphenateString(prop) {
  return prop.replace(/([A-Z])/g, hyphenateChar)
}
