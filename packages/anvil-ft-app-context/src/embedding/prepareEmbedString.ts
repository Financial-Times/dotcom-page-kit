import { TAppContext } from '../types'
import { APP_CONTEXT_ELEMENT_ID } from '../constants'

export function prepareEmbedString(appContext: TAppContext) {
  const jsonData = JSON.stringify(appContext)
  return `<script type="application/json" id="${APP_CONTEXT_ELEMENT_ID}">${jsonData}</script>`
}
