import { TAppContext } from '../types'
import { loadDataFromScriptEmbed } from './loadDataFromScriptEmbed'
import { loadDataFromAttributesEmbed } from './loadDataFromAttributesEmbed'

export function loadEmbeddedAppContextData(): TAppContext {
  return loadDataFromScriptEmbed() || loadDataFromAttributesEmbed()
}
