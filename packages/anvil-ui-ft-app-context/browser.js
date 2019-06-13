import { AppContextClient } from './src/client/AppContextClient'
import { loadEmbeddedAppContextData } from './src/client/loadEmbeddedAppContextData'

export function init() {
  const context = loadEmbeddedAppContextData()
  return new AppContextClient({ context })
}
