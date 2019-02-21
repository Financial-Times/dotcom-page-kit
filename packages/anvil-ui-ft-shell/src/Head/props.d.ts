export interface TDocumentHeadProps {
  criticalStyles?: string
  description: string
  enableJsonLD?: boolean
  enableOpenGraph?: boolean
  facebookDescription?: string
  facebookHeadline?: string
  facebookImage?: string
  facebookPage?: string
  googleSiteVerification: string
  mainImage?: string
  metadata?: { [key: string]: string }
  pageTitle?: string
  robots?: string
  siteTitle: string
  socialDescription?: string
  socialHeadline?: string
  socialImage?: string
  stylesheets: string[]
  twitterCard?: string
  twitterDescription?: string
  twitterHeadline?: string
  twitterImage?: string
  twitterSite?: string
  url: string
  children: any
}
