import { TAppContext } from '../types'

export default class AppContext {
  private context: Partial<TAppContext>

  constructor(context: Partial<AppContext> = {}) {
    this.context = Object.freeze(context)
  }

  get(property: string): any | undefined {
    return this.context.hasOwnProperty(property) ? this.context[property] : undefined
  }

  getAll(): any {
    return this.context
  }
}
