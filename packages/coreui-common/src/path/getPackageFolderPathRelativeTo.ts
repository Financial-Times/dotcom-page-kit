import path from 'path'
import fsx from 'fs-extra'

export function getPackageFolderPathRelativeTo(contextFolder) {
  let currentFolderPath = contextFolder
  let prospectivePath = path.join(currentFolderPath, 'package.json')
  let isPackageDotJson = fsx.pathExistsSync(prospectivePath)
  while (!isPackageDotJson) {
    const parts = currentFolderPath.split(path.sep)
    parts.splice(-1, 1)
    currentFolderPath = path.join(path.sep, ...parts)
    prospectivePath = path.join(currentFolderPath, 'package.json')
    isPackageDotJson = fsx.pathExistsSync(prospectivePath)
  }
  return currentFolderPath
}
