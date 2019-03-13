import FlagsClient from './FlagsClient'
import loadFlags from './loadFlags'
import formatFlagsData from './formatFlagsData'

function createFlagsClient() {
  const flagsData = loadFlags()
  return new FlagsClient(flagsData)
}

export { formatFlagsData, createFlagsClient }
