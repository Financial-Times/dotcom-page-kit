import fs from 'fs'

export default function loadFileContents(filePath: string): string {
  return fs.readFileSync(filePath).toString()
}
