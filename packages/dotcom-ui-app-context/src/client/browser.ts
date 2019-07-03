import AppContext from './AppContext'
import loadEmbeddedAppContext from './loadAppContext'

export function init() {
  const context = loadEmbeddedAppContext()
  return new AppContext({ context })
}
