import fs from 'fs'
import path from 'path'

const bootstrapJS = String(fs.readFileSync(path.join(__dirname, 'bootstrap.js')))

export interface BootstrapOptions {
  /** A list of scripts to load for the core experience */
  coreScripts?: string[]
  /** A list of scripts to load for the enhanced experience */
  enhancedScripts?: string[]
}

export function getHTML(options: BootstrapOptions): string {
  return `
    <script type="application/json" id="bootstrap-config">
      ${getConfigJSON(options)}
    </script>
    <script>
      ${getSnippetJS()}
    </script>
  `
}

export function getConfigJSON(options: BootstrapOptions): string {
  return JSON.stringify({
    core: options.coreScripts || [],
    enhanced: options.enhancedScripts || []
  })
}

export function getSnippetJS(): string {
  return bootstrapJS
}
