import { DataEmbedClient as subject } from '../../client'
import loadDataEmbed from '../../client/loadDataEmbed'
import DataEmbedStore from '../../client/DataEmbedStore'
jest.mock('../../client/loadDataEmbed.ts')
jest.mock('../../client/DataEmbedStore.ts')

describe('dotcom-ui-app-context/src/client/DataEmbedClient', () => {
  describe('.init()', () => {
    it('returns the value of an existing data embed data', () => {
      const instance = new subject('TEST')
      instance.init()

      expect(loadDataEmbed).toBeCalledWith('TEST')
      expect(DataEmbedStore).toHaveBeenCalledTimes(1)
    })
  })
})
