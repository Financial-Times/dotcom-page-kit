import Subject from '../FlagsClient'

jest.mock('../loadFlags', () => {
  return jest.fn().mockReturnValue({ foo: 1, bar: true })
})

describe('anvil-ui-ft-flags/src/FlagsClient', () => {
  describe('.get()', () => {
    let instance

    beforeEach(() => {
      instance = new Subject({ foo: 1, bar: true })
    })

    it('returns the value of a flag which exists', () => {
      expect(instance.get('foo')).toBe(1)
      expect(instance.get('bar')).toBe(true)
    })

    it('returns undefined for flags which do not exist', () => {
      expect(instance.get('baz')).toBeUndefined()
    })
  })
})
