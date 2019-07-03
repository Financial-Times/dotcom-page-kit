import { Handler } from '../types/Handler'

interface HookToHandlerMap {
  [hook: string]: Handler[]
}

export class HandlerRegistry {
  hookToHandlerMap: HookToHandlerMap = {}

  register(hook: string, resource: any) {
    this.ensureThatSpaceExistsFor(hook)
    this.hookToHandlerMap[hook].push(resource)
  }

  ensureThatSpaceExistsFor(hook: string) {
    if (!this.hookToHandlerMap[hook]) {
      this.hookToHandlerMap[hook] = []
    }
  }

  getHandlersByHook(hook: string) {
    this.ensureThatSpaceExistsFor(hook)
    return this.hookToHandlerMap[hook]
  }
}
