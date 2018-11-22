export interface PluginSettings {
  /** Replace the function used when compiling JSX expressions */
  jsxPragma?: string
  /** Replace the component used when compiling JSX fragments */
  jsxPragmaFrag?: string
  /** You can test your browserslist string at https://browserl.ist/ */
  presetEnvTargets?: any
}
