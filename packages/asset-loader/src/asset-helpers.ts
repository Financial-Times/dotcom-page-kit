import fs from 'fs'

export const loadManifest = (filename: string) => {
  const manifestBuffer = fs.readFileSync(require.resolve(filename))
  return JSON.parse(manifestBuffer.toString())
}
