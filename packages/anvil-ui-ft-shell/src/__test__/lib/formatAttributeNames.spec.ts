import subject from '../../lib/formatAttributeNames'

const fixture = Object.freeze({
  dataVersion: 123,
  dataAppName: 'test',
  userLoggedIn: true,
  lang: 'en-GB'
})

describe('anvil-ui-open-graph/src/lib/formatAttributeNames', () => {
  it('returns a new object', () => {
    const result = subject(fixture)
    expect(result).not.toBe(fixture)
  })

  it('converts camelCase property names to kebab-case', () => {
    const result = subject(fixture)

    expect(result).toHaveProperty('data-version', 123)
    expect(result).toHaveProperty('data-app-name', 'test')
    expect(result).toHaveProperty('user-logged-in', true)
    expect(result).toHaveProperty('lang', 'en-GB')
  })
})
