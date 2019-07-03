import fs from 'fs'
import findUp from 'find-up'

const bootstrapJS = String(fs.readFileSync(findUp.sync('lib/bootstrap.js', { cwd: __dirname })))

export default function getBootstrapJS(): string {
  return bootstrapJS
}
