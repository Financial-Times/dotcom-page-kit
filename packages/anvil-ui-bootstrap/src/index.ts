import fs from 'fs'
import path from 'path'

const bootstrapScript = String(fs.readFileSync(path.join(__dirname, 'bootstrap.js')))

export interface BootstrapOptions {
  /** A list of scripts to load for the core experience */
  coreScriptFiles?: string[]
  /** A list of scripts to load for the enhanced experience */
  enhancedScriptFiles?: string[]
}

export default ({ coreScriptFiles = [], enhancedScriptFiles = [] }: BootstrapOptions) => `
  <script type="application/json" id="scripts-config">
    ${JSON.stringify({
      core: coreScriptFiles,
      enhanced: enhancedScriptFiles
    })}
  </script>
  <script>
    ${bootstrapScript}
  </script>
`
