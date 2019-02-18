import { Plugin } from '@financial-times/anvil-pluggable'

export interface AnvilConfig {
  plugins: Plugin[]
  settings?: {
    build?: {
      entry?: any
      targets?: any
    }
  }
}
