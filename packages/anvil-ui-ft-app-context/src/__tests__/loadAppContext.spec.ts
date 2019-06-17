/**
 * @jest-environment jsdom
 */

import subject from '../client/loadAppContext'

describe('anvil-ui-ft-app-context/src/client/loadAppContext', () => {
  describe('when there is a configuration object', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <script type="application/json" id="ft-app-context">{"appName":"app-name","appVersion":"123"}</script>
      `
    })

    it('returns a frozen object', () => {
      const result = subject()

      expect(result).toEqual({ appName: 'app-name', appVersion: '123' })
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
