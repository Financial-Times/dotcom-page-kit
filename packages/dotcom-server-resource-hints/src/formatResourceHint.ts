interface ResourceHintMeta {
  // <https://www.w3.org/TR/preload/#as-attribute>
  as?: 'style' | 'script' | 'image' | 'document' | 'font' | 'file' | string
  // <https://w3c.github.io/resource-hints/#dfn-resource-hint-link>
  rel?: 'preload' | 'prefetch' | 'precache' | 'preconnect' | 'prerender' | string
  // <https://html.spec.whatwg.org/multipage/urls-and-fetching.html#cors-settings-attributes>
  crossorigin?: 'use-credentials' | 'anonymous' | boolean
}

export default (file: string, meta: ResourceHintMeta = {}): string => {
  const header = [`<${file}>`]

  Object.entries(meta).forEach(([key, value]) => {
    if (value) {
      header.push(`${key}="${value}"`)
    }
  })

  if (!meta.rel) {
    header.push('rel="preload"')
  }

  header.push('nopush')

  return header.join('; ')
}
