export default function formatGlobPatterns(pattern: string, extension: string): string {
  return `/${pattern}${extension}`
}
