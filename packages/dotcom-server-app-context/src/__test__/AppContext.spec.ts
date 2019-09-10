import { AppContext } from '../AppContext'
import * as fixtures from './__fixtures__/contextData'

describe('dotcom-server-app-context/src/AppContext', () => {
  describe('constructor', () => {
    let instance

    beforeAll(() => {
      instance = new AppContext({ appContext: fixtures.validAppContext })
    })

    it('sets the given context data', () => {
      expect(instance.data).toEqual(fixtures.validAppContext)
    })

    describe('invalid data', () => {
      it('throws if any context data is invalid', () => {
        const init = () =>
          new AppContext({
            appContext: fixtures.invalidAppContext as any
          })

        expect(init).toThrow()
      })
    })
  })

  describe('.get()', () => {
    let instance

    beforeEach(() => {
      instance = new AppContext({ appContext: fixtures.validAppContext })
    })

    it('returns the value of the requested context property', () => {
      const result = instance.get('appVersion')
      expect(result).toBe(fixtures.validAppContext.appVersion)
    })
  })

  describe('.set()', () => {
    let instance

    beforeEach(() => {
      instance = new AppContext()
    })

    it('sets the value of the specified property', () => {
      instance.set('appVersion', 'v12')
      expect(instance.data.appVersion).toBe('v12')
    })

    it('throws if the given value is invalid', () => {
      expect(() => instance.set('conceptId', 123)).toThrow()
    })
  })

  describe('.getAll()', () => {
    let instance

    beforeEach(() => {
      instance = new AppContext({ appContext: fixtures.validAppContext })
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
})
