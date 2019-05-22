export interface TAppContext {
  app: string
  edition: string
  abState: string
  version: string
  contentId?: string
  contentType?: string
  isProduction: boolean
  publishReference?: string
}
