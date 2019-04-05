import path from 'path'
import glob from 'glob'

export type TFilePaths = {
  [key: string]: string
}

export default function loadPartialFiles(cwd: string, partials: TFilePaths, extension: string): TFilePaths {
  const partialFiles = {}

  Object.keys(partials).forEach((relativePath) => {
    const globPattern = partials[relativePath]
    const baseDirectory = path.resolve(cwd, relativePath)

    const matchingFiles = glob.sync(`${globPattern}${extension}`, {
      cwd: baseDirectory,
      absolute: true
    })

    matchingFiles.forEach((matchingFile) => {
      const name = path.relative(baseDirectory, matchingFile).replace(extension, '')
      partialFiles[name] = matchingFile
    })
  })

  return partialFiles
}
