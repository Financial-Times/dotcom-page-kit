/**
 * @jest-environment jsdom
 */

import subject from '../../client/loadClientEmbed'
const SCRIPT_ELEMENT_ID = 'TEST'

describe('dotcom-ui-flags/src/client/loadClientEmbed', () => {
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
