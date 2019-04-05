import path from 'path'

export default function formatPartialName(filePath: string) {
  const extname = path.extname(filePath)
  return filePath.replace(extname, '')
}
