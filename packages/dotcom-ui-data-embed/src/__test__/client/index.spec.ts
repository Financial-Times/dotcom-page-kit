import { init as subject } from '../../client'
import loadDataEmbed from '../../client/loadDataEmbed'
import DataEmbedStore from '../../client/DataEmbedStore'
jest.mock('../../client/loadDataEmbed.ts')
jest.mock('../../client/DataEmbedStore.ts')

describe('dotcom-ui-app-context/src/client/index', () => {
  describe('.init()', () => {
    it('returns the value of an existing data embed store', () => {
      const result = subject({ id: 'TEST' })
      expect(result).toBeInstanceOf(DataEmbedStore)
      expect(loadDataEmbed).toBeCalledWith('TEST')
      expect(DataEmbedStore).toHaveBeenCalledTimes(1)
    })
  })
})
