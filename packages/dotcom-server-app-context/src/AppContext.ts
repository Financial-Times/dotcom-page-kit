import { TAppContext } from './types'
import validate from './validate'
import filterEmptyData from './filterEmptyData'

export type TAppContextOptions = {
  context?: Partial<TAppContext>
}

export class AppContext {
  public data: Partial<TAppContext>

  constructor(options: TAppContextOptions = {}) {
    this.data = filterEmptyData({ ...options.context })
  }

  get(property: string) {
    return this.data[property]
  }

  set(property: string, value: any) {
    this.data[property] = value
  }

  validate() {
    return validate(this.data)
  }
}
