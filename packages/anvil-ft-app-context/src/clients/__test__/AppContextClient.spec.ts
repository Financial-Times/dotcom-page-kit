import { AppContextClient } from '../AppContextClient'
import { appContextWithExtras as context } from '../../__fixtures__/appContext'

describe('AppContextClient', () => {
  describe('.data', () => {
    it('returns the app context data', () => {
      const appContextClient = new AppContextClient({ context })
      expect(appContextClient.data).toEqual(context)
    })
  })

  describe(".get('item')", () => {
    it('returns the value of the equivalent app context property', () => {
      const appContextClient = new AppContextClient({ context })
      const result = appContextClient.get('appVersion')
      expect(result).toBe(context.appVersion)
    })
  })
})
