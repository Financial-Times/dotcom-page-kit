import { Pluggable } from '../entities/Pluggable'

interface HandlerArgs {
  resource: any
  pluggable: Pluggable
  publish: (hook: string, resource: any) => any
  [key: string]: any
}

export interface Handler {
  (args: HandlerArgs): any
}
