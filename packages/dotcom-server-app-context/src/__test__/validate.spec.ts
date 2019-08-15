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
})
