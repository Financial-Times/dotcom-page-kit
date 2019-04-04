import formatGlobPattern from './formatGlobPattern'
import formatPartialName from './formatPartialName'
import findPartialFiles from './findPartialFiles'

export type TFilePaths = {
  [key: string]: string
}

export type TFileContents = {
  [key: string]: string
}

export default function loadPartialFiles(filePaths: TFilePaths, extension: string): TFileContents {
  const partialFiles = {}

  Object.entries(filePaths).forEach(([relativePath, globPattern]) => {
    const pattern = formatGlobPattern(globPattern, extension)
    const filePaths = findPartialFiles(relativePath, pattern)

    filePaths.forEach((filePath) => {
      const name = formatPartialName(relativePath, filePath)
      partialFiles[name] = filePath
    })
  })

  return partialFiles
}
