import subject from '../../lib/formatAttributeNames'

const fixture = Object.freeze({
  dataVersion: 123,
  dataAppName: 'test',
  userLoggedIn: true,
  lang: 'en-GB'
})

describe('dotcom-ui-shell/src/lib/formatAttributeNames', () => {
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

  it('converts boolean data properties to boolean data attributes', () => {
    const fixture = { dataIsProduction: true, dataIsDevelopment: false, userIsLoggedIn: true }
    const result = subject(fixture)

    // where react is concerned, a `true` boolean data attribute
    // is one where the attribute value is an empty string (because
    // it is not possible to render the attribute without a value),
    // and a `false` boolean data attribute is one where the attribute
    // has not been specified altogether
    expect(result).toEqual({
      'data-is-production': '',
      'user-is-logged-in': true
    })
  })
})
