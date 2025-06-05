import React from 'react'
import imageServiceIconURL from '../lib/imageServiceIconURL'
import OpenGraph, { TOpenGraphProps } from './OpenGraph'
import LinkedData, { TLinkedDataProps } from './LinkedData'

export type TDocumentHeadProps = TOpenGraphProps &
  TLinkedDataProps & {
    description?: string
    facebookPage?: string
    googleSiteVerification?: string
    metaTags?: Array<{ [key: string]: any }>
    pageTitle: string
    robots?: string
    siteTitle?: string
    twitterSite?: string
    canonicalURL?: string
    manifestFile?: string
    additionalMetadata?: React.ReactNode,
    showSmartBanner?: boolean
  }

const DocumentHead = (props: TDocumentHeadProps) => (
  <React.Fragment>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>{props.pageTitle ? `${props.pageTitle}` : props.siteTitle}</title>

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

    {/* native apps */}
    {props.showSmartBanner &&
      (
        <meta
          name="apple-itunes-app"
          content={props.canonicalURL ? `app-id=1200842933, app-argument=${props.canonicalURL}` : 'app-id=1200842933'}
        />
      )
    }

    {/* packaging */}
    <link
      rel="icon"
      type="image/svg+xml"
      href={imageServiceIconURL('ftlogo-v1:brand-ft-logo-square-coloured', 0, 'svg')}
    />
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

    {props.manifestFile ? <link rel="manifest" href={props.manifestFile} /> : null}

    {/* We can't add an option for every single metadata option so allow custom elements to be inserted*/}
    {props.additionalMetadata}
  </React.Fragment>
)

DocumentHead.defaultProps = {
  facebookPage: '8860325749',
  googleSiteVerification: '4-t8sFaPvpO5FH_Gnw1dkM28CQepjzo8UjjAkdDflTw',
  metaTags: [],
  jsonLd: [],
  robots: 'index,follow,max-snippet:200,max-image-preview:large',
  siteTitle: 'Financial Times',
  twitterSite: '@FinancialTimes',
  manifestFile: 'https://www.ft.com/__assets/creatives/manifest/manifest-v6.json',
  additionalMetadata: null,
  showSmartBanner: true
}

export default DocumentHead
