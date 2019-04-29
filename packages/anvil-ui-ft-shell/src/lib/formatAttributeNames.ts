export type TAttributeData = {
  [key: string]: string | number | boolean
}

export default function formatAttributeNames(data: TAttributeData = {}) {
  const output = {}

  for (const [key, value] of Object.entries(data)) {
    output[hyphenateString(key)] = value
  }

  return output
}

function hyphenateChar(char) {
  return '-' + char.toLowerCase()
}

function hyphenateString(prop) {
  return prop.replace(/([A-Z])/g, hyphenateChar)
}
