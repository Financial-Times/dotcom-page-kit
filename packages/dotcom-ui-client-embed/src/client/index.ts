import loadClientEmbed from './loadClientEmbed'
import ClientEmbedData from './ClientEmbedData'

class ClientEmbedClient {
  private id: string
  constructor(id: string) {
    this.id = id
  }
  init() {
    const data = loadClientEmbed(this.id)
    return new ClientEmbedData(data)
  }
}

export { loadClientEmbed, ClientEmbedClient }
