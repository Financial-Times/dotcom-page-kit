import loadDataEmbed from './loadDataEmbed'
import DataEmbedStore from './DataEmbedStore'

class DataEmbedClient {
  private id: string
  constructor(id: string) {
    this.id = id
  }
  init() {
    const data = loadDataEmbed(this.id)
    return new DataEmbedStore(data)
  }
}

export { loadDataEmbed, DataEmbedClient }
