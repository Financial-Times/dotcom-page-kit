import { Plugin } from '@financial-times/dotcom-page-kit-pluggable'

export interface PageKitConfig {
  plugins: Plugin[]
  settings?: {
    build?: {
      entry?: any
      targets?: any
    }
  }
}
