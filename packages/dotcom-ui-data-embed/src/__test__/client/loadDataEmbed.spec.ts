/**
 * @jest-environment jsdom
 */

import subject from '../../client/loadDataEmbed'
const SCRIPT_ELEMENT_ID = 'data-embed'

describe('dotcom-ui-data-embed/src/client/loadDataEmbed', () => {
  describe('when there is a configuration object', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <script id="${SCRIPT_ELEMENT_ID}">{"foo":1,"bar":true,"baz":"qux"}</script>
      `
    })

    it('returns a frozen object', () => {
      const result = subject(SCRIPT_ELEMENT_ID)

      expect(result).toEqual({ foo: 1, bar: true, baz: 'qux' })
      expect(Object.isFrozen(result)).toBe(true)
    })
  })

  describe('when there is no a configuration object', () => {
    beforeEach(() => {
      document.body.innerHTML = ''
    })

    it('returns a frozen empty object', () => {
      const result = subject(SCRIPT_ELEMENT_ID)

      expect(result).toEqual({})
      expect(Object.isFrozen(result)).toBe(true)
    })
  })
})
