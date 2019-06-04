import AppContext from '../shared/appContext/AppContextClient'
import loadAppContextData from './loadAppContextData'

export default function init() {
  const context = loadAppContextData()
  return new AppContext({ context })
}
