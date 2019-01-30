import { Handler } from './Handler'
import { Pluggable } from '../entities/Pluggable'

interface PluginApi {
  on: (hook: string, handler: Handler) => void
}

export interface Plugin {
  (pluggable: Pluggable): void
}
