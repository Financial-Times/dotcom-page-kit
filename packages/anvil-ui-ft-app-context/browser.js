import { AppContext } from './src/client/AppContext'
import { loadAppContext } from './src/client/loadAppContext'

export function init() {
  const context = loadAppContext()
  return new AppContext({ context })
}
