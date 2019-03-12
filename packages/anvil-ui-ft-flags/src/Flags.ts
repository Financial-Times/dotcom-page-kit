import { TFlags, TFlag } from './types'
import loadFlags from './loadFlags'

export default class Flags {
  public flags: TFlags

  constructor(flags?: TFlags) {
    this.flags = flags || loadFlags()
  }

  get(flag: string): TFlag {
    return this.flags.hasOwnProperty(flag) ? this.flags[flag] : undefined
  }
}
