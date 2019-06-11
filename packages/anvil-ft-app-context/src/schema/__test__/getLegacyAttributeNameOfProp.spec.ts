import { getLegacyAttributeNameOfProp } from '../getLegacyAttributeNameOfProp'

describe('getLegacyAttributeNameOfProp(propName: string)', () => {
  describe('when the prop exists', () => {
    it('returns the legacy data attribute name when there is a mapping in the schema', () => {
      const result = getLegacyAttributeNameOfProp('isProduction')
      expect(result).toBe('data-next-is-production')
    })

    it('infers the data attribute name when when there is no mapping in the schema', () => {
      const result = getLegacyAttributeNameOfProp('abState')
      expect(result).toBe('data-ab-state')
    })
  })

  describe('when the prop does not exist', () => {
    it('infers the data attribute name when the prop does not exist', () => {
      const result = getLegacyAttributeNameOfProp('fooBar')
      expect(result).toBe('data-foo-bar')
    })
  })
})
