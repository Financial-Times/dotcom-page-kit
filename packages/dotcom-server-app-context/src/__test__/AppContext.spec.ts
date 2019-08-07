import { AppContext } from '../AppContext'
import * as fixtures from './__fixtures__/contextData'

describe('dotcom-server-app-context/src/AppContext', () => {
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
  })

  describe('.get()', () => {
    let instance

    beforeEach(() => {
      instance = new AppContext({ context: fixtures.validAppContext })
    })

    it('returns the value of the requested context property', () => {
      const result = instance.get('appVersion')
      expect(result).toBe(fixtures.validAppContext.appVersion)
    })
  })

  describe('.set()', () => {
    let instance

    beforeEach(() => {
      instance = new AppContext({ context: fixtures.validAppContext })
    })

    it('sets the value of the specified property', () => {
      instance.set('appVersion', 'v12')
      expect(instance.data.appVersion).toBe('v12')
    })
  })

  describe('.getAll()', () => {
    let instance

    beforeEach(() => {
      instance = new AppContext({ context: fixtures.validAppContext })
    })

    it('returns a clone of the app context data', () => {
      const result = instance.getAll()
      expect(result).not.toBe(instance.data)
    })

    it('freezes the app context data clone', () => {
      const result = instance.getAll()
      expect(Object.isFrozen(result)).toBe(true)
    })
  })

  describe('.validate()', () => {
    let instance

    beforeEach(() => {
      instance = new AppContext({ context: fixtures.validAppContext })
    })

    it('returns true when the data is valid', () => {
      instance.set('edition', 'uk')
      expect(instance.validate()).toBe(true)
    })

    it('throws if any data is invalid', () => {
      instance.set('edition', 'Atlantis')
      expect(() => instance.validate()).toThrow()
    })
  })
})
