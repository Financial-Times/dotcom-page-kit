import AppContext from './AppContext'
import loadEmbeddedAppContext from './loadAppContext'

export function init() {
  const context = loadEmbeddedAppContext()
  const client = new AppContext({ context })

  console.log('Page Kit app context:', client.getAll()) // eslint-disable-line no-console

  return client
}
