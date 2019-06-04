import { TAppContext } from '../types'
import loadFromScriptEmbed from './loadFromScriptEmbed'
import loadFromDataAttributesEmbed from './loadFromDataAttributesEmbed'

export default function loadAppContextData(): TAppContext {
  return loadFromScriptEmbed() || loadFromDataAttributesEmbed()
}
