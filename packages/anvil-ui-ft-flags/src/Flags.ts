import { TFlagsData, TFlag } from './types'
import loadFlags from './loadFlags'

export default class Flags {
  public flags: TFlagsData

  constructor(flags?: TFlagsData) {
    this.flags = flags || loadFlags()
  }

  get(flag: string): TFlag {
    return this.flags.hasOwnProperty(flag) ? this.flags[flag] : undefined
  }
}
