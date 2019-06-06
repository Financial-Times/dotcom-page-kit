import { init } from '../browser'
import { appContext } from '../__fixtures__/appContext'
import { AppContextClient } from '../clients/AppContextClient'
import { loadEmbeddedAppContextData } from '../embedding/loadEmbeddedAppContextData'

jest.mock('../embedding/loadEmbeddedAppContextData')

describe('init()', () => {
  it('Returns an app context client that has been loaded with data', () => {
    ;(loadEmbeddedAppContextData as any).mockReturnValue(appContext)
    const result = init()
    expect(result).toBeInstanceOf(AppContextClient)
    expect(result.data).toEqual(loadEmbeddedAppContextData())
  })
})
