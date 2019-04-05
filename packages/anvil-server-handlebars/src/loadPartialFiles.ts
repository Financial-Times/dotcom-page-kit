import path from 'path'
import glob from 'glob'

export type TFileGlobs = {
  [key: string]: string
}

export default function loadPartialFiles(cwd: string, filePaths: TFileGlobs, extension: string): string[] {
  const partialFiles = []

  Object.entries(filePaths).forEach(([relativePath, globPattern]) => {
    const filePaths = glob.sync(`${globPattern}${extension}`, {
      cwd: path.resolve(cwd, relativePath),
      absolute: true
    })

    partialFiles.push(...filePaths)
  })

  return partialFiles
}
