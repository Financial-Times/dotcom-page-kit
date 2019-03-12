import FlagsClient from './FlagsClient'
import loadFlags from './loadFlags'
import formatFlagsData from './formatFlagsData'

function createFlagsClient() {
  return new FlagsClient(loadFlags())
}

export { formatFlagsData, createFlagsClient }
