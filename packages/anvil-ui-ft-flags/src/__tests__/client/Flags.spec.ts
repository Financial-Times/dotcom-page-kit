import Subject from '../../client/Flags'

const fixture = { foo: 1, bar: true }

describe('anvil-ui-ft-flags/src/client/Flags', () => {
  let instance

  beforeEach(() => {
    instance = new Subject(fixture)
  })

  describe('.get()', () => {
    it('returns the value of a flag which exists', () => {
      expect(instance.get('foo')).toBe(1)
      expect(instance.get('bar')).toBe(true)
    })

    it('returns undefined for flags which do not exist', () => {
      expect(instance.get('baz')).toBeUndefined()
    })
  })

  describe('.getAll()', () => {
    it('returns all flags data', () => {
      expect(instance.getAll()).toEqual(fixture)
    })

    it('freezes the flags data', () => {
      expect(Object.isFrozen(instance.getAll())).toBe(true)
    })
  })
})
