/**
 * @jest-environment jsdom
 */

import { loadFlags as subject } from '..'

describe('anvil-ui-ft-flags/src/loadFlags', () => {
  describe('when there is a configuration object', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <script id="flags-data">{"foo":1,"bar":true,"baz":"qux"}</script>
      `
    })

    it('returns an object', () => {
      const result = subject()
      expect(result).toEqual({ foo: 1, bar: true, baz: 'qux' })
    })
  })

  describe('when there is not a configuration object', () => {
    beforeEach(() => {
      document.body.innerHTML = ''
    })

    it('returns an empty object', () => {
      const result = subject()
      expect(result).toEqual({})
    })
  })
})
