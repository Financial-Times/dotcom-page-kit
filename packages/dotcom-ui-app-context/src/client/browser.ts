import AppContext from './AppContext'
import loadEmbeddedAppContext from './loadAppContext'

export function init() {
  const appContext = loadEmbeddedAppContext()
  const client = new AppContext({ appContext })

  console.log('Page Kit app context:', client.getAll()) // eslint-disable-line no-console

  return client
}
