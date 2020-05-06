import loadClientEmbed from './loadClientEmbed'
import ClientEmbedData from './ClientEmbedData'

const init = (id: string) => {
  const data = loadClientEmbed(id)
  return new ClientEmbedData(data)
}

export { loadClientEmbed, ClientEmbedData, init }
