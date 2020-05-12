import loadDataEmbed from './loadDataEmbed'
import DataEmbedStore from './DataEmbedStore'

function init({ id }: { id: string }) {
  const data = loadDataEmbed(id)
  return new DataEmbedStore(data)
}

export { loadDataEmbed, init }
