import { loadDataEmbed } from '@financial-times/dotcom-ui-data-embed'
import { TAppContext } from '../types'
import { APP_CONTEXT_ELEMENT_ID } from '../constants'

export default function loadEmbeddedAppContext(): TAppContext {
  return loadDataEmbed(APP_CONTEXT_ELEMENT_ID) as TAppContext
}
