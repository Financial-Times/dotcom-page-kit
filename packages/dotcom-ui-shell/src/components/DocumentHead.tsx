import React from 'react'
import imageServiceIconURL from '../lib/imageServiceIconURL'
import OpenGraph, { TOpenGraphProps } from './OpenGraph'
import LinkedData, { TLinkedDataProps } from './LinkedData'
import GTMHead from './GTMHead'

export type TDocumentHeadProps = TOpenGraphProps &
  TLinkedDataProps & {
    flags?
    description?: string
    facebookPage?: string
    googleSiteVerification?: string
    metaTags?: Array<{ [key: string]: any }>
    pageTitle: string
    robots?: string
    siteTitle?: string
    twitterSite?: string
    canonicalURL?: string
    additionalMetadata?: React.ReactNode
  }

const DocumentHead = (props: TDocumentHeadProps) => (
  <React.Fragment>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>{props.pageTitle ? `${props.pageTitle} | ${props.siteTitle}` : props.siteTitle}</title>

    {props.description && <meta name="description" content={props.description} />}

    {props.canonicalURL && <link rel="canonical" href={props.canonicalURL} />}

    {/* SEO */}
    <meta name="robots" content={props.robots} />
    <meta name="google-site-verification" content={props.googleSiteVerification} />
    {props.metaTags.map((attributes, i) => (
      <meta key={`meta-${i}`} {...attributes} />
    ))}
    <LinkedData jsonLd={props.jsonLd} />

    {/* social media */}
    <meta property="fb:pages" content={props.facebookPage} />
    <meta property="twitter:site" content={props.twitterSite} />
    <OpenGraph openGraph={props.openGraph} />

    {/* packaging */}
    <link
      rel="icon"
      type="image/png"
      href={imageServiceIconURL('ftlogo-v1:brand-ft-logo-square-coloured', 32)}
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href={imageServiceIconURL('ftlogo-v1:brand-ft-logo-square-coloured', 194)}
      sizes="194x194"
    />
    <link
      rel="apple-touch-icon"
      href={imageServiceIconURL('ftlogo-v1:brand-ft-logo-square-coloured', 180)}
      sizes="180x180"
    />

    {/* We can't add an option for every single metadata option so allow custom elements to be inserted*/}
    {props.additionalMetadata}
    <GTMHead flags={props.flags} />
  </React.Fragment>
)

DocumentHead.defaultProps = {
  description:
    'News, analysis and comment from the Financial Times, the worldʼs leading global business publication',
  facebookPage: '8860325749',
  googleSiteVerification: '4-t8sFaPvpO5FH_Gnw1dkM28CQepjzo8UjjAkdDflTw',
  metaTags: [],
  jsonLd: [],
  robots: 'index,follow',
  siteTitle: 'Financial Times',
  twitterSite: '@FinancialTimes',
  additionalMetadata: null,
  flags: {}
}

export default DocumentHead
