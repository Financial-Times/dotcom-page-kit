import { ClientEmbed } from '@financial-times/dotcom-ui-client-embed'
import { TAppContext } from '../types'
import { APP_CONTEXT_ELEMENT_ID } from '../constants'

export type TAppContextProps = {
  appContext?: TAppContext
}

export function AppContextEmbed({ appContext }: TAppContextProps) {
  return ClientEmbed({ id: APP_CONTEXT_ELEMENT_ID, data: appContext })
}
