import { AppContextClient } from './clients/AppContextClient'
import { loadEmbeddedAppContextData } from './embedding/loadEmbeddedAppContextData'

export function init() {
  const context = loadEmbeddedAppContextData()
  return new AppContextClient({ context })
}
