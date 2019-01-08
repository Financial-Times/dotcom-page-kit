import path from 'path'

const StyleFiles = new Set(['.css'])

const ScriptFiles = new Set(['.js', '.mjs'])

const ImageFiles = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'])

const FontFiles = new Set(['.woff', '.otf', '.ttf', '.eot'])

export default (filename: string): string => {
  const extension = path.extname(filename)

  if (StyleFiles.has(extension)) {
    return 'style'
  }

  if (ScriptFiles.has(extension)) {
    return 'script'
  }

  if (ImageFiles.has(extension)) {
    return 'image'
  }

  if (FontFiles.has(extension)) {
    return 'font'
  }

  throw Error(`Unknown filename extension "${extension}`)
}
