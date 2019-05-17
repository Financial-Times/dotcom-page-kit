import loadFlags from './loadFlags'
import Flags from './Flags'

const init = () => {
  const flagsData = loadFlags()
  return new Flags(flagsData)
}

export { loadFlags, Flags, init }
