import fs from 'fs'
import path from 'path'

const bootstrapJS = String(fs.readFileSync(path.join(__dirname, '../lib/bootstrap.js')))

export function formatConfigJSON(coreScripts: string[], enhancedScripts: string[]): string {
  return JSON.stringify({
    core: coreScripts,
    enhanced: enhancedScripts
  })
}

export function getBootstrapJS(): string {
  return bootstrapJS
}
