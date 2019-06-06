import { appContext } from '../../__fixtures__/appContext'
import { ensureValidAppContext } from '../ensureValidAppContext'

describe('ensureValidAppContext(data)', () => {
  it('throws an error if the supplied data object is valid in accordance with the app context schema', () => {
    const routine = () => {
      const data = { isProduction: 'foo' }
      ensureValidAppContext(data)
    }
    expect(routine).toThrow()
  })

  it('does not throw an error if the supplied data object is valid in accordance with the app context schema', () => {
    const routine = () => {
      ensureValidAppContext(appContext)
    }
    expect(routine).not.toThrow()
  })
})
