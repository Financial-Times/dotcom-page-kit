import path from 'path'

export default function formatPartialName(baseDirectory: string, filePath: string) {
  const extname = path.extname(filePath)
  const relativePath = path.relative(baseDirectory, filePath)

  return relativePath.replace(extname, '');
}
