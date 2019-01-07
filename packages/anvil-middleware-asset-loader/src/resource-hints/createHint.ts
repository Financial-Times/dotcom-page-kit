interface HintMeta {
  // <https://www.w3.org/TR/preload/#as-attribute>
  as: 'style' | 'script' | 'image' | 'document' | 'font' | 'file' | string
  // <https://w3c.github.io/resource-hints/#dfn-resource-hint-link>
  rel: 'preload' | 'prefetch' | 'precache' | 'preconnect' | 'prerender' | string
  crossorigin: boolean
}

export default function(file: string, meta: Partial<HintMeta> = {}): string {
  const header = []

  header.push(`<${file}>`)

  Object.keys(meta).forEach((key) => {
    const value = meta[key]

    if (value) {
      header.push(`${key}="${value}"`)
    }
  })

  if (!meta.hasOwnProperty('rel')) {
    header.push('rel=preload')
  }

  header.push('nopush')

  return header.join('; ')
}
