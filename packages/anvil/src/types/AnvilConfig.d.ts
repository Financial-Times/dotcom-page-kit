import { Plugin } from '@financial-times/anvil-pluggable'

export interface AnvilConfig {
  plugins: Plugin[]
  buildSettings?: {
    entry?: any
    targets?: any
  }
}
