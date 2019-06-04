import { TAppContext } from '../../types'
import { ensureValidAppContext } from '../schema'

export interface AppContextClientConstructorArgs {
  context?: Partial<TAppContext>
}

export default class AppContextClient {
  data: Partial<TAppContext>

  constructor({ context = {} }: AppContextClientConstructorArgs = {}) {
    ensureValidAppContext(context)
    this.data = context
  }

  get(item: string) {
    return this.data[item]
  }
}
