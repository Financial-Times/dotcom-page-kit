/**
 * @jest-environment jsdom
 */

import { Flags as Subject, Flags } from '..'

jest.mock('../loadFlags', () => {
  return jest.fn().mockReturnValue({ foo: 1, bar: true })
})

describe('anvil-ui-ft-flags/src/Flags', () => {
  describe('constructor', () => {
    it('allows flags to be provided', () => {
      const instance = new Flags({ baz: 'qux' })
      expect(instance.flags).toEqual({ baz: 'qux' })
    })

    it('attempts to get flags when not provided', () => {
      const instance = new Flags()
      expect(instance.flags).toEqual({ foo: 1, bar: true })
    })
  })

  describe('.get()', () => {
    let instance

    beforeEach(() => {
      instance = new Subject()
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
