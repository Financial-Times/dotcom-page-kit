import { PageKitConfig } from '../types/PageKitConfig'
import { Pluggable } from '@financial-times/dotcom-page-kit-pluggable'

interface ConstructorArgs {
  config: PageKitConfig
  isDevMode: boolean
}

export class ConfigContext extends Pluggable {
  context = this
  config: PageKitConfig
  isDevMode: boolean

  constructor({ config, isDevMode }: ConstructorArgs) {
    super({ alias: 'config', plugins: config.plugins })

    this.config = normaliseConfig(config)
    this.isDevMode = isDevMode
  }
}

function normaliseConfig(config: Partial<PageKitConfig> = {}) {
  return { plugins: [], settings: {}, ...config }
}
