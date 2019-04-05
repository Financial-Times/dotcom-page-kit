import path from 'path'
import glob from 'glob'

export type TFileGlobs = {
  [key: string]: string
}

export type TFilePaths = {
  [key: string]: string
}

export default function loadPartialFiles(cwd: string, filePaths: TFileGlobs, extension: string): TFilePaths {
  const partialFiles = {}

  Object.keys(filePaths).forEach((relativePath) => {
    const globPattern = filePaths[relativePath]
    const baseDirectory = path.resolve(cwd, relativePath)

    const matchingFiles = glob.sync(`${globPattern}${extension}`, {
      cwd: baseDirectory,
      absolute: true
    })

    matchingFiles.forEach((matchingFile) => {
      const name = path.relative(baseDirectory, matchingFile)
      partialFiles[name] = matchingFile
    })
  })

  return partialFiles
}
