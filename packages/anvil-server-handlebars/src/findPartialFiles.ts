import path from 'path'
import glob from 'glob'
import { TFilePaths } from './types'

export default function loadPartialFiles(cwd: string, partialPaths: TFilePaths): TFilePaths {
  const partialFiles = {}

  Object.keys(partialPaths).forEach((partialPath) => {
    const globPattern = partialPaths[partialPath]
    const baseDirectory = path.resolve(cwd, partialPath)

    const matchingFiles = glob.sync(globPattern, {
      cwd: baseDirectory
    })

    matchingFiles.forEach((file) => {
      const extension = path.extname(file)
      const name = file.replace(extension, '')

      partialFiles[name] = path.join(baseDirectory, file)
    })
  })

  return partialFiles
}
