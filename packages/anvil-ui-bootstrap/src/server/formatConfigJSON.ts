export default function formatConfigJSON(
  coreScripts: string[],
  enhancedScripts: string[],
  trackErrors: boolean = false
): string {
  return JSON.stringify({
    trackErrors,
    core: coreScripts,
    enhanced: enhancedScripts
  })
}
