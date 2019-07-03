import { TFlagsData, TFlag } from '../types'

export default class Flags {
  private flags: TFlagsData

  constructor(flags: TFlagsData) {
    this.flags = Object.freeze(flags)
  }

  get(flag: string): TFlag | undefined {
    return this.flags.hasOwnProperty(flag) ? this.flags[flag] : undefined
  }

  getAll(): TFlagsData {
    return this.flags
  }
}
