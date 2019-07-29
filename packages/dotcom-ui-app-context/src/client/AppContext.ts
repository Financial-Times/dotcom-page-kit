import { TAppContext } from '../types'

export type TAppContextOptions = {
  context: TAppContext
}
export default class AppContext {
  private context: TAppContext

  constructor(options: TAppContextOptions) {
    this.context = Object.freeze(options.context)
  }

  get(property: string): any {
    return this.context.hasOwnProperty(property) ? this.context[property] : undefined
  }

  getAll(): TAppContext {
    return this.context
  }
}
