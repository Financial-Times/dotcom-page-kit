import { TAppContext } from '../types'

export interface AppContextConstructorProps {
  context?: Partial<TAppContext>
}

export default class ShareAppContext {
  data: Partial<TAppContext>

  constructor({ context = {} }: AppContextConstructorProps = {}) {
    this.data = context
  }

  get(item: string) {
    return this.data[item]
  }
}
