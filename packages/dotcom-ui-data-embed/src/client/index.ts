import loadDataEmbed from './loadDataEmbed'
import DataEmbedStore from './DataEmbedStore'

const init = ({ id }: { id: string }) => {
  const data = loadDataEmbed(id)
  return new DataEmbedStore(data)
}

export { loadDataEmbed, init }
