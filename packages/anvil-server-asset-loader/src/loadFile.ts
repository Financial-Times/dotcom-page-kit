import fs from 'fs'

// Avoid hitting the disk each time a file is requested and instead
// hold the file contents in memory for the lifecycle of the app
const store = new Map()

export function loadFile(fullPath: string, cache: boolean = false): string {
  if (store.has(fullPath)) {
    return store.get(fullPath)
  } else {
    const fileAsBuffer = fs.readFileSync(fullPath)
    const fileAsString = String(fileAsBuffer)

    if (cache) {
      store.set(fullPath, fileAsString)
    }

    return fileAsString
  }
}
