/**
 * @jest-environment jsdom
 */

import subject from '../client/loadAppContext'
import AppContext from '../client/AppContext'

describe('dotcom-ui-app-context/src/client/loadAppContext', () => {
  describe('when there is a configuration object', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <script type="application/json" data-page-kit-context="appContext">
          {"appName":"app-name","appVersion":"123"}
        </script>
        <script type="application/json" data-page-kit-context>
        </script>
        <script type="application/json" data-page-kit-context="custom1">
          {"customValue":"custom-value-1","customData":["a", "b", "c"]}
        </script>
        <script type="application/json" data-page-kit-context="custom2">
        </script>
        <script type="application/json" data-page-kit-context="custom3">
          {"customValue":"custom-value-3","customData":["d", "e", "f"]}
        </script>
      `
    })

    it('processes multiple contexts', () => {
      const allContexts = subject()
      const client = new AppContext(allContexts)

      expect(client.getAll()).toEqual({
        appName: 'app-name',
        appVersion: '123'
      })
      expect(allContexts.custom1).toEqual({
        customData: ['a', 'b', 'c'],
        customValue: 'custom-value-1'
      })
    })

    it('returns a frozen object', () => {
      const result = subject()

      expect(result).toEqual({
        appContext: { appName: 'app-name', appVersion: '123' },
        custom1: { customValue: 'custom-value-1', customData: ['a', 'b', 'c'] },
        custom2: {},
        custom3: { customValue: 'custom-value-3', customData: ['d', 'e', 'f'] }
      })
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
