import fs from 'fs'
import findUp from 'find-up'

const bootstrapJS = String(fs.readFileSync(findUp.sync('lib/bootstrap.js', { cwd: __dirname })))

export function formatConfigJSON(coreScripts: string[], enhancedScripts: string[]): string {
  return JSON.stringify({
    core: coreScripts,
    enhanced: enhancedScripts
  })
}

export function getBootstrapJS(): string {
  return bootstrapJS
}
