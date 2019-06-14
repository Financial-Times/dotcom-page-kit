import subject from '../client/AppContext'

const fakeContext: object = {
  appName: 'app-name',
  appVersion: '123',
  edition: 'uk',
  product: 'next',
  abTestState: 'someCohort:on',
  isProduction: true
}

describe('anvil-ui-ft-app-context/src/client/AppContext', () => {
  let instance

  beforeEach(() => {
    instance = new subject(fakeContext)
  })

  describe('.get()', () => {
    it('returns the value of an existing context', () => {
      expect(instance.get('appName')).toBe('app-name')
      expect(instance.get('isProduction')).toBe(true)
    })

    it('returns undefined for contexts which do not exist', () => {
      expect(instance.get('foo')).toBeUndefined()
    })
  })

  describe('.getAll()', () => {
    it('returns all context data', () => {
      expect(instance.getAll()).toEqual(fakeContext)
    })

    it('freezes the context data', () => {
      expect(Object.isFrozen(instance.getAll())).toBe(true)
    })
  })
})
