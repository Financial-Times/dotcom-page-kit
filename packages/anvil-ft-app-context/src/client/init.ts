import AppContext from '../shared/AppContext'
import loadAppContextData from './loadAppContextData'

export default function init() {
  const context = loadAppContextData()
  return new AppContext({ context })
}
