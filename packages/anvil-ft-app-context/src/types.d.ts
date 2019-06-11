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
  publishReference?: string
  [key: string]: any
}

export interface TLegacyAppContextDataAttributes {
  dataAppContext: string
  dataNextApp: string
  dataNextEdition: string
  dataNextProduct: string
  dataAbState: string
  dataNextVersion: string
  dataContentId?: string
  dataContentType?: string
  dataConceptId?: string
  dataTaxonomy?: string
  dataNextIsProduction: boolean
  dataPublishReference?: string
  [key: string]: any
}
