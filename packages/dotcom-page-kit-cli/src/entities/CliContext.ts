import { PageKitConfig } from '../types/PageKitConfig'
import { Pluggable } from '@financial-times/dotcom-page-kit-pluggable'

interface ConstructorArgs {
  config: PageKitConfig
  isDevMode: Boolean
}

export class CliContext extends Pluggable {
  cli = this
  config: PageKitConfig
  isDevMode: Boolean

  constructor({ config, isDevMode }: ConstructorArgs) {
    super({ alias: 'cli', plugins: config.plugins })

    this.config = normaliseConfig(config)
    this.isDevMode = isDevMode
  }
}

function normaliseConfig(config: Partial<PageKitConfig> = {}) {
  return { plugins: [], settings: {}, ...config }
}
