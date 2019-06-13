import { AppContextClient } from './src/client/AppContextClient'
import { loadEmbeddedAppContextData } from './src/client/loadAppContext'

export function init() {
  const context = loadEmbeddedAppContextData()
  return new AppContextClient({ context })
}
