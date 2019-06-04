import init from '../init'
import loadAppContextData from '../loadAppContextData'
import { AppContextClient } from '../../shared/appContext'
import { appContext } from '../../__fixtures__/appContext'

jest.mock('../loadAppContextData')

describe('init()', () => {
  it('Returns an app context client that has been loaded with data', () => {
    ;(loadAppContextData as any).mockReturnValue(appContext)
    const result = init()
    expect(result).toBeInstanceOf(AppContextClient)
    expect(result.data).toEqual(loadAppContextData())
  })
})
