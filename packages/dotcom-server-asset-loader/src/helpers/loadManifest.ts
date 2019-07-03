import { loadFile } from './loadFile'

export function loadManifest(filePath: string) {
  const manifest = loadFile(filePath)
  return JSON.parse(manifest)
}
