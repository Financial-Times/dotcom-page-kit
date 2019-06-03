import init from '../init'
import loadAppContextData from '../loadAppContextData'
import SharedAppContextClient from '../../shared/AppContext'
import { appContext } from '../../__fixtures__/appContext'

jest.mock('../loadAppContextData')

describe('init()', () => {
  it('Returns an app context client that has been loaded with data', () => {
    ;(loadAppContextData as any).mockReturnValue(appContext)
    const result = init()
    expect(result).toBeInstanceOf(SharedAppContextClient)
    expect(result.data).toEqual(loadAppContextData())
  })
})
