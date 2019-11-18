const { URL } = require('url')

export function buildLink(url, queryParams = {}) {
  if (!url) return ''
  const urlObject = new URL(url)
  Object.keys(queryParams).forEach((key) => {
    urlObject.searchParams.set(key, queryParams[key])
  })
  return urlObject.href
}
