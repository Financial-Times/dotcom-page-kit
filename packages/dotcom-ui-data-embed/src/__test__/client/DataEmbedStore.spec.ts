import subject from '../../client/DataEmbedStore'

const fakeData = {
  foo: 1,
  bar: true,
  baz: 'qux'
}

describe('dotcom-ui-data-embed/src/client/DataEmbedStore', () => {
  let instance

  beforeEach(() => {
    instance = new subject(fakeData)
  })

  describe('.get()', () => {
    it('returns the value of an existing data', () => {
      expect(instance.get('foo')).toBe(1)
      expect(instance.get('bar')).toBe(true)
      expect(instance.get('baz')).toBe('qux')
    })

    it('returns undefined for contexts which do not exist', () => {
      expect(instance.get('buzz')).toBeUndefined()
    })
  })

  describe('.getAll()', () => {
    it('returns all data', () => {
      expect(instance.getAll()).toEqual(fakeData)
    })

    it('freezes the data', () => {
      expect(Object.isFrozen(instance.getAll())).toBe(true)
    })
  })
})
