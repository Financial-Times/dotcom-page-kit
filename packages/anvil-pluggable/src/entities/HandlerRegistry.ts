import { Handler } from '../types/Handler'

interface Index {
  [hook: string]: Handler[]
}

export class HandlerRegistry {
  index: Index = {}

  register(hook: string, resource: any) {
    this.ensureThatSpaceExistsFor(hook)
    this.index[hook].push(resource)
  }

  ensureThatSpaceExistsFor(hook: string) {
    if (!this.index[hook]) {
      this.index[hook] = []
    }
  }

  getHandlersByHook(hook: string) {
    this.ensureThatSpaceExistsFor(hook)
    return this.index[hook]
  }
}
