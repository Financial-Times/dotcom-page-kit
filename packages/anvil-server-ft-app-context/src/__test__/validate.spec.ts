import subject from '../validate'
import * as fixtures from './__fixtures__/contextData'

describe('anvil-server-ft-app-context/src/validate', () => {
  it('returns true when given valid data', () => {
    expect(subject(fixtures.validAppContext)).toBe(true)
  })

  it('throws an error when given invalid data', () => {
    expect(() => subject(fixtures.invalidAppContext)).toThrow(
      'Validation error: data.isProduction should be boolean'
    )
  })
})
