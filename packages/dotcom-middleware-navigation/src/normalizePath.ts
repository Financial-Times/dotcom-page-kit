import url from 'url'

export default function normalizePath(currentPath: string): string {
  // NOTE: We're using Node's old URL API because it can handle partial URLs
  return url.parse(currentPath).pathname || ''
}
