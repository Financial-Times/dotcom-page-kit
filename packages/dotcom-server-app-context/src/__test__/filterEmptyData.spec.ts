import subject from '../filterEmptyData'

const fixture = Object.freeze({
  appName: 'article',
  abTest: ' ',
  appVersion: null,
  isProduction: false
})

describe('dotcom-server-app-context/src/filterEmptyData', () => {
  it('returns a new object', () => {
    const result = subject(fixture)
    expect(result).not.toBe(fixture)
  })

  it('removes null values', () => {
    const result = subject(fixture)
    expect(result).not.toHaveProperty('appVersion')
  })

  it('removes empty string values', () => {
    const result = subject(fixture)
    expect(result).not.toHaveProperty('abTest')
  })

  it('copies all defined values', () => {
    const result = subject(fixture)

    expect(result).toHaveProperty('appName', 'article')
    expect(result).toHaveProperty('isProduction', false)
  })
})
