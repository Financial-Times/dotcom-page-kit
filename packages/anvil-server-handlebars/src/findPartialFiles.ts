import glob from 'glob'

export default function findPartialFiles(baseDirectory: string, globPattern: string): string[] {
  return glob.sync(globPattern, { root: baseDirectory })
}
