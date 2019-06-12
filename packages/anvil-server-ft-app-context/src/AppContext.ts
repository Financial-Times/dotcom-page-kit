import { TAppContext } from './types'
import validate from './validate'

export type TAppContextOptions = {
  context?: Partial<TAppContext>
}

export class AppContext {
  public data: Partial<TAppContext>

  constructor(options: TAppContextOptions = {}) {
    this.data = { ...options.context }
    this.validate()
  }

  get(item: string) {
    return this.data[item]
  }

  set(item: string, value: any) {
    this.data[item] = value
  }

  validate() {
    return validate(this.data)
  }
}
