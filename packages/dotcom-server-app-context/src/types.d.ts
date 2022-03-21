export interface TAppContext {
  appName: string
  appVersion: string
  product: string
  edition: string
  abTestState: string
  contentId?: string
  contentType?: string
  conceptId?: string
  conceptType?: string
  isProduction: boolean
  isUserLoggedIn?: boolean
  isUserSubscribed?: boolean
  publishReference?: string
  [key: string]: any
}
