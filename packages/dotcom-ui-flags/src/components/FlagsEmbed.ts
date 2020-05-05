import { ClientEmbed } from '@financial-times/dotcom-ui-client-embed'
import { formatFlagsJSON } from '../server'
import { TFlagsData } from '../types'
import { SCRIPT_ELEMENT_ID } from '../constants'

type TFlagsEmbedProps = {
  flags?: TFlagsData
}

function FlagsEmbed({ flags }: TFlagsEmbedProps) {
  return ClientEmbed({ id: SCRIPT_ELEMENT_ID, data: formatFlagsJSON(flags) })
}

FlagsEmbed.defaultProps = {
  flags: {}
}

export { FlagsEmbed, TFlagsEmbedProps }
