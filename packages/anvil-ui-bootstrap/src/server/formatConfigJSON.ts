export default function formatConfigJSON(coreScripts: string[], enhancedScripts: string[]): string {
  return JSON.stringify({
    core: coreScripts,
    enhanced: enhancedScripts
  })
}
