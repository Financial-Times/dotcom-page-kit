export interface PluginOptions {
  /** Replace the function used when compiling JSX expressions */
  jsxPragma?: string
  /** Replace the component used when compiling JSX fragments */
  jsxPragmaFrag?: string
  /** Enable usage of babel-plugin-transform-require-default */
  enableRequireDefault?: boolean
}
