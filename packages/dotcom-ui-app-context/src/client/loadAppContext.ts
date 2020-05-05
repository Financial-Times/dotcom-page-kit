import { loadClientEmbed } from '@financial-times/dotcom-ui-client-embed'
import { TAppContext } from '../types'
import { APP_CONTEXT_ELEMENT_ID } from '../constants'

export default function loadEmbeddedAppContext(): TAppContext {
  return loadClientEmbed(APP_CONTEXT_ELEMENT_ID) as TAppContext
}
