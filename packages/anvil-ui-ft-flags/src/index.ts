import FlagsClient from './FlagsClient'
import loadFlags from './loadFlags'
import formatFlagsJSON from './formatFlagsJSON'

function createFlagsClient() {
  const flagsData = loadFlags()
  return new FlagsClient(flagsData)
}

export { formatFlagsJSON, createFlagsClient }
