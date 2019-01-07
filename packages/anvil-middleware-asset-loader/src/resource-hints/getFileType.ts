import path from 'path'

const StyleFileExtensions = new Set(['css'])

const ScriptFileExtensions = new Set(['js', 'mjs'])

const ImageFileExtensions = new Set(['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'])

const FontFileExtensions = new Set(['woff', 'otf', 'ttf', 'eot'])

export default (filename: string): string | null => {
  const extension = path.extname(filename)

  if (StyleFileExtensions.has(extension)) {
    return 'style'
  }

  if (ScriptFileExtensions.has(extension)) {
    return 'script'
  }

  if (ImageFileExtensions.has(extension)) {
    return 'image'
  }

  if (FontFileExtensions.has(extension)) {
    return 'font'
  }

  return null
}
