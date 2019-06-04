import { appContext } from '../../../__fixtures__/appContext'
import { ensureValidAppContext, getPropNameOfLegacyDataAttribute, getLegacyAttributeNameOfProp } from '..'

describe('schema utils', () => {
  describe('ensureValidAppContext(data)', () => {
    it('throws an error if the supplied data object is valid in accordance with the app context schema', () => {
      const routine = () => {
        const data = { isProduction: 'foo' }
        ensureValidAppContext(data)
      }
      expect(routine).toThrow()
    })

    it('does not throw an error if the supplied data object is valid in accordance with the app context schema', () => {
      const routine = () => {
        ensureValidAppContext(appContext)
      }
      expect(routine).not.toThrow()
    })
  })

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
})
