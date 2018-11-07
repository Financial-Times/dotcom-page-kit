import findUp from 'find-up'

export function getPackageFolderPathRelativeTo(contextFolder) {
  const packageDotJsonPath = findUp.sync('package.json', { cwd: contextFolder })
  const filePath = packageDotJsonPath.replace('/package.json', '')
  return filePath
}
