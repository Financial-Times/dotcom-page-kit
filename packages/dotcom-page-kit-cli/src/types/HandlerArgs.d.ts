import { ConfigContext } from '../entities/ConfigContext'
import * as pluggable from '@financial-times/dotcom-page-kit-pluggable'

export interface HandlerArgs extends pluggable.HandlerArgs {
  context: ConfigContext
}
