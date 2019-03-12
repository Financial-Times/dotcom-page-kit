import { TFlags } from './types'
import loadFlags from './loadFlags'

export default class Flags {
  private flags: TFlags

  constructor(flags?: TFlags) {
    this.flags = flags || loadFlags()
  }

  get(flag: string): string | boolean | null {
    return this.flags ? this.flags[flag] : null
  }
}
