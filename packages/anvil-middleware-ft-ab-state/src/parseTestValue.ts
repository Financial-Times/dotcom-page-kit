export default (value: string) => {
  if (/^(on|off)$/.test(value)) {
    return value === 'on'
  }

  if (/^(true|false|\d+)$/.test(value)) {
    return JSON.parse(value)
  }

  return value
}
