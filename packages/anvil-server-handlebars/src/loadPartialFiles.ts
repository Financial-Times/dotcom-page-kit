import findPartialFiles from './findPartialFiles'
import formatGlobPattern from './formatGlobPattern'
import loadFileContents from './loadFileContents'
import formatPartialName from './formatPartialName'

export type TFilePaths = {
  [key: string]: string[]
}

export type TFileContents = {
  [key: string]: string
}

export default function loadPartialFiles(filePaths: TFilePaths, extension: string): TFileContents {
  const partialFiles = {}

  Object.entries(filePaths).forEach(([relativePath, globPatterns]) => {
    const globPattern = formatGlobPattern(globPatterns, extension)
    const filePaths = findPartialFiles(relativePath, globPattern)

    filePaths.forEach((filePath) => {
      const name = formatPartialName(relativePath, filePath)
      const contents = loadFileContents(filePath)

      partialFiles[name] = contents
    })
  })

  return partialFiles
}
