import fs from 'fs'
import path from 'path'

const bootstrapJS = String(fs.readFileSync(path.join(__dirname, '../lib/bootstrap.js')))

export function getConfigJSON(coreScripts: string[], enhancedScripts: string[]): string {
  return JSON.stringify({
    core: coreScripts,
    enhanced: enhancedScripts
  })
}

export function getSnippetJS(): string {
  return bootstrapJS
}
