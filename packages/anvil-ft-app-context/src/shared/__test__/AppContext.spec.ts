import ShareAppContext from '../AppContext'
import { appContextWithExtras as context } from '../../__fixtures__/appContext'

describe('AppContext', () => {
  describe('.data', () => {
    it('returns the app context data', () => {
      const appContext = new ShareAppContext({ context })
      expect(appContext.data).toEqual(context)
    })
  })

  describe(".get('item')", () => {
    it('returns the value of the equivalent app context property', () => {
      const appContext = new ShareAppContext({ context })
      const result = appContext.get('appVersion')
      expect(result).toBe(context.appVersion)
    })
  })
})
