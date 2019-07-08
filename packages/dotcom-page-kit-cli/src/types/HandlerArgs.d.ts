import { CliContext } from '../entities/CliContext'
import * as pluggable from '@financial-times/dotcom-page-kit-pluggable'

export interface HandlerArgs extends pluggable.HandlerArgs {
  cli: CliContext
}
