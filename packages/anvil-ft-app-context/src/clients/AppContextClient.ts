import { TAppContext } from '../types'
import { ensureValidAppContext } from '../schema/ensureValidAppContext'

export interface AppContextClientConstructorArgs {
  context?: Partial<TAppContext>
}

export class AppContextClient {
  data: Partial<TAppContext>

  constructor({ context = {} }: AppContextClientConstructorArgs = {}) {
    ensureValidAppContext(context)
    this.data = context
  }

  get(item: string) {
    return this.data[item]
  }
}
