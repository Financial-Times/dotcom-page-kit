import { ClientEmbedClient as subject } from '../../client'
import loadClientEmbed from '../../client/loadClientEmbed'
import ClientEmbedData from '../../client/ClientEmbedData'
jest.mock('../../client/loadClientEmbed.ts')
jest.mock('../../client/ClientEmbedData.ts')

describe('dotcom-ui-app-context/src/client/ClientEmbedData', () => {
  describe('.init()', () => {
    it('returns the value of an existing client embed data', () => {
      const instance = new subject('TEST')
      instance.init()

      expect(loadClientEmbed).toBeCalledWith('TEST')
      expect(ClientEmbedData).toHaveBeenCalledTimes(1)
    })
  })
})
