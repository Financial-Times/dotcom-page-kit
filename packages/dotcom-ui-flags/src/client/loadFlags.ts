import { loadDataEmbed } from '@financial-times/dotcom-ui-data-embed'
import { TFlagsData } from '../types'
import { SCRIPT_ELEMENT_ID } from '../constants'

export default function loadFlags(): TFlagsData {
  return loadDataEmbed(SCRIPT_ELEMENT_ID)
}
