import path from 'path'

export default function formatPartialName(rootDirectory: string, filePath: string) {
  const relativePath = path.relative(rootDirectory, filePath)
  const extension = path.extname(relativePath)

  return relativePath.replace(extension, '')
}
