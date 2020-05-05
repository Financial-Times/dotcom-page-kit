import { loadClientEmbed } from '@financial-times/dotcom-ui-client-embed'
import { TFlagsData } from '../types'
import { SCRIPT_ELEMENT_ID } from '../constants'

export default function loadFlags(): TFlagsData {
  return loadClientEmbed(SCRIPT_ELEMENT_ID)
}
