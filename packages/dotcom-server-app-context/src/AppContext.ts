import { TAppContext } from './types'
import validate from './validate'
import filterEmptyData from './filterEmptyData'

export type TAppContextOptions = {
  context?: Partial<TAppContext>
}

export class AppContext {
  private data: Partial<TAppContext>

  constructor(options: TAppContextOptions = {}) {
    this.data = filterEmptyData({ ...options.context })
  }

  get(property: string) {
    return this.data[property]
  }

  set(property: string, value: any) {
    this.data[property] = value
  }

  getAll(): Partial<TAppContext> {
    return Object.freeze({ ...this.data })
  }

  validate() {
    return validate(this.data)
  }
}
