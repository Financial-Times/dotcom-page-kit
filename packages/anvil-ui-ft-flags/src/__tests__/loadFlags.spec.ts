/**
 * @jest-environment jsdom
 */

import subject from '../lib/loadFlags'

describe('anvil-ui-ft-flags/src/lib/loadFlags', () => {
  describe('when there is a configuration object', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <script id="flags-data">{"foo":1,"bar":true,"baz":"qux"}</script>
      `
    })

    it('returns a frozen object', () => {
      const result = subject()

      expect(result).toEqual({ foo: 1, bar: true, baz: 'qux' })
      expect(Object.isFrozen(result)).toBe(true)
    })
  })

  describe('when there is no a configuration object', () => {
    beforeEach(() => {
      document.body.innerHTML = ''
    })

    it('returns a frozen empty object', () => {
      const result = subject()

      expect(result).toEqual({})
      expect(Object.isFrozen(result)).toBe(true)
    })
  })
})
