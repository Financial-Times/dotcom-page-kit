import FlagsClient from './lib/FlagsClient'
import loadFlags from './lib/loadFlags'

export default function createFlagsClient(): FlagsClient {
  const flagsData = loadFlags()
  return new FlagsClient(flagsData)
}
