import AppContext from './AppContext'
import loadEmbeddedAppContext from './loadAppContext'

export function init() {
  const { appContext, ...customContext } = loadEmbeddedAppContext()
  const client = new AppContext({ appContext })

  console.log('Page Kit app context:', client.getAll()) // eslint-disable-line no-console
  console.log('Custom context:', Object.keys(customContext)) // eslint-disable-line no-console

  return client
}
