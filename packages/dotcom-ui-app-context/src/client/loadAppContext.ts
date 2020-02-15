/*eslint no-console: ["error", { allow: ["error"] }] */

import { TAppContext } from '../types'

function parseContent(el: HTMLElement) {
  const id = el.dataset.pageKitContext

  try {
    const content = el.innerHTML.trim()
    const json = content.length ? JSON.parse(content) : {}
    return { id, json }
  } catch (err) {
    console.error(`Embedded context ${id} could not be loaded`, err)
    return {}
  }
}

type Context = {
  appContext: TAppContext
  [key: string]: {}
}
export default function loadEmbeddedAppContext(): Context {
  const data: Context = { appContext: undefined }
  const contextNodes = document.querySelectorAll('[data-page-kit-context]')

  contextNodes.forEach((el: HTMLElement) => {
    const { id, json } = parseContent(el)

    if (id && json) {
      data[id] = json
    }
  })

  return Object.freeze(data)
}
