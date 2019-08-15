import { TAppContext } from './types'
import validate from './validate'
import filterEmptyData from './filterEmptyData'

export type TAppContextOptions = {
  context?: Partial<TAppContext>
}

export class AppContext {
  private data: Partial<TAppContext> = {}

  constructor(options: TAppContextOptions = {}) {
    const data = filterEmptyData({ ...options.context })

    for (const [ property, value ] of Object.entries(data)) {
      this.set(property, value)
    }
  }

  get(property: string) {
    return this.data[property]
  }

  set(property: string, value: any) {
    if (validate(property, value)) {
      this.data[property] = value
    }
  }

  getAll(): Partial<TAppContext> {
    return Object.freeze({ ...this.data })
  }
}
