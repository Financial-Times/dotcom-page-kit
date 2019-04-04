import path from 'path'

export default function formatPartialName(baseDirectory: string, filePath: string) {
  const relativePath = path.relative(baseDirectory, filePath)
  const extension = path.extname(relativePath)

  return relativePath.replace(extension, '')
}
