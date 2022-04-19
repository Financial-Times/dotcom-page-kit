import path from 'path'
import url from 'url'

const StyleFiles = new Set(['.css'])

const ScriptFiles = new Set(['.js', '.mjs'])

const ImageFiles = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'])

export default (file: string): string => {
  // Always parse the file so that we can ignore any domain names, query strings etc.
  // Node's old URL API is able to parse anything inc. filenames, paths, and URLs.
  const { pathname } = url.parse(file)

  const extension = path.extname(pathname)

  if (StyleFiles.has(extension)) {
    return 'style'
  }

  if (ScriptFiles.has(extension)) {
    return 'script'
  }

  if (ImageFiles.has(extension)) {
    return 'image'
  }

  if (file.includes('font_format=woff')) {
    return 'font'
  }

  throw Error(`Unknown filename extension "${extension}`)
}
