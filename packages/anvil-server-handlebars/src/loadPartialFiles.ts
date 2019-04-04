import path from 'path'
import formatGlobPattern from './formatGlobPattern'
import formatPartialName from './formatPartialName'
import findPartialFiles from './findPartialFiles'

export type TFileGlobs = {
  [key: string]: string
}

export type TFileContents = {
  [key: string]: string
}

export default function loadPartialFiles(cwd: string, filePaths: TFileGlobs, extension: string): TFileContents {
  const partialFiles = {}

  Object.entries(filePaths).forEach(([relativePath, globPattern]) => {
    const directory = path.resolve(cwd, relativePath)
    const pattern = formatGlobPattern(globPattern, extension)
    const filePaths = findPartialFiles(directory, pattern)

    filePaths.forEach((filePath) => {
      const name = formatPartialName(relativePath, filePath)
      partialFiles[name] = filePath
    })
  })

  return partialFiles
}
