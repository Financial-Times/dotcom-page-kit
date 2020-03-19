import subject from '../validate'

describe('dotcom-server-app-context/src/validate', () => {
  it('returns true when given a valid property/value', () => {
    expect(subject('isProduction', true)).toBe(true)
  })

  it('throws an error when given an invalid property/value', () => {
    expect(() => subject('isProduction', 'yes')).toThrow(
      'Validation error: data.isProduction should be boolean'
    )
  })

  it('throws an error when given an unknown property/value', () => {
    expect(() => subject('thisProperty', 'isNotInTheSchema')).toThrow(
      'Validation error: data should NOT have additional properties, received "isNotInTheSchema"'
    )
  })
})
