import { TAppContext } from '../types'

export type TAppContextOptions = {
  appContext: TAppContext
}
export default class AppContext {
  private appContext: TAppContext

  constructor(options: TAppContextOptions) {
    this.appContext = Object.freeze(options.appContext)
  }

  get(property: string): any {
    return this.appContext.hasOwnProperty(property) ? this.appContext[property] : undefined
  }

  getAll(): TAppContext {
    return this.appContext
  }
}
