export interface TAppContext {
  app: string
  edition: string
  abState: string
  version: string
  contentId?: string
  contentType?: string
  isProduction: boolean
  publishReference?: string
  [key: string]: any
}

export interface TLegacyAppContextDataAttributes {
  dataAppContext: string
  dataNextApp: string
  dataNextEdition: string
  dataAbState: string
  dataNextVersion: string
  dataContentId?: string
  dataContentType?: string
  dataNextIsProduction: boolean
  dataPublishReference?: string
  [key: string]: any
}
