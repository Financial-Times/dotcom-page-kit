import { TAppContext } from '../types'
import { ensureValidAppContext } from './schema'

export interface AppContextConstructorProps {
  context?: Partial<TAppContext>
}

export default class ShareAppContext {
  data: Partial<TAppContext>

  constructor({ context = {} }: AppContextConstructorProps = {}) {
    ensureValidAppContext(context)
    this.data = context
  }

  get(item: string) {
    return this.data[item]
  }
}
