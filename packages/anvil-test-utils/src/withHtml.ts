import withDomOverwrites from 'with-dom-overwrites'

interface Args {
  html?: string
  execute?: Function
  [key: string]: any
}

export function withHtml(args: Args | string, execute?: Function) {
  const run = execute || (args as Args).execute
  const html = execute ? args : (args as Args).html

  withDomOverwrites({ overwrites: { 'document.documentElement.outerHTML': html }, run })
}
