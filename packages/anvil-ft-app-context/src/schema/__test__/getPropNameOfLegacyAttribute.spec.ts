import { getPropNameOfLegacyDataAttribute } from '../getPropNameOfLegacyAttribute'

describe('getPropNameOfLegacyDataAttribute(dataAttributeName)', () => {
  it('returns the prop name when there is a mapping in the schema', () => {
    const result = getPropNameOfLegacyDataAttribute('data-next-app')
    expect(result).toBe('appName')
  })

  it('infers the prop name when there is no mapping in the schema', () => {
    const result = getPropNameOfLegacyDataAttribute('data-foo-bar')
    expect(result).toBe('fooBar')
  })
})
