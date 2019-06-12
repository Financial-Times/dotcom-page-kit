import { AppContext } from '../AppContext'
import * as fixtures from '../__fixtures__/contextData'

describe('anvil-server-ft-app-context/src/AppContext', () => {
  describe('constructor', () => {
    let instance

    beforeAll(() => {
      instance = new AppContext({ context: fixtures.validAppContext })
    })

    it('clones the given context data', () => {
      expect(instance.data).not.toBe(fixtures.validAppContext)
    })

    it('sets the given context data', () => {
      expect(instance.data).toEqual(fixtures.validAppContext)
    })

    it('throws when initialised with invalid data', () => {
      // we must coerce the invalid data to prevent TypeScript checking it and noticing it's bad
      expect(() => new AppContext({ context: fixtures.invalidAppContext as any })).toThrow()
    })
  })

  describe('.get()', () => {
    let instance

    beforeAll(() => {
      instance = new AppContext({ context: fixtures.validAppContext })
    })

    it('returns the value of the requested context property', () => {
      const result = instance.get('appVersion')
      expect(result).toBe(fixtures.validAppContext.appVersion)
    })
  })

  describe('.set()', () => {
    let instance

    beforeAll(() => {
      instance = new AppContext({ context: fixtures.validAppContext })
    })

    it('sets the value of the specified property', () => {
      instance.set('appVersion', 'v12')
      expect(instance.data.appVersion).toBe('v12')
    })
  })

  describe('.validate()', () => {
    let instance

    beforeAll(() => {
      instance = new AppContext({ context: fixtures.validAppContext })
    })

    it('throws if any data is invalid', () => {
      instance.set('edition', 'Atlantis')
      expect(() => instance.isValid()).toThrow()
    })
  })
})
