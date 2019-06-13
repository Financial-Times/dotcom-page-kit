import { AppContextClient } from './src/client/AppContextClient'
import { loadAppContext } from './src/client/loadAppContext'

export function init() {
  const context = loadAppContext()
  return new AppContextClient({ context })
}
