import { CliContext } from '../entities/CliContext'
import * as pluggable from '@financial-times/anvil-pluggable'

export interface HandlerArgs extends pluggable.HandlerArgs {
  cli: CliContext
}
