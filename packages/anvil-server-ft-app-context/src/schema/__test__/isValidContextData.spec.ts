import subject from '../isValidContextData'
import * as fixtures from '../../__fixtures__/contextData'

describe('anvil-server-ft-app-context/src/schema/isValidContextData', () => {
  it('returns true for valid data', () => {
    expect(subject(fixtures.validAppContext)).toBe(true)
  })

  it('throws an error for invalid data', () => {
    expect(() => subject(fixtures.invalidAppContext)).toThrow()
  })
})
