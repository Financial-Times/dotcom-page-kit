import React from 'react'
import OpenGraph, { TOpenGraphProps } from '../OpenGraph'
import LinkedData, { TLinkedDataObject } from './LinkedData'
import StyleSheets, { TStylesheetProps } from '../StyleSheets'

export interface TDocumentHeadProps extends TStylesheetProps, TOpenGraphProps {
  description?: string
  facebookPage?: string
  googleSiteVerification?: string
  jsonLd?: TLinkedDataObject[]
  pageTitle: string
  robots?: string
  siteTitle?: string
  twitterSite?: string
  url?: string
}

const DocumentHead = (props: TDocumentHeadProps) => (
  <React.Fragment>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>{props.pageTitle ? `${props.pageTitle} | ${props.siteTitle}` : props.siteTitle}</title>

    {props.description && <meta name="description" content={props.description} />}

    {props.url && <link rel="canonical" href={props.url} />}

    {/* resource hints */}
    <link rel="preconnect" href="https://spoor-api.ft.com" />
    <link rel="preconnect" href="https://session-next.ft.com" crossOrigin="use-credentials" />
    <link rel="preconnect" href="https://ads-api.ft.com" />
    <link rel="preconnect" href="https://www.googletagservices.com" />

    {/* assets */}
    <StyleSheets stylesheets={props.stylesheets} criticalStyles={props.criticalStyles} />

    {/* SEO */}
    <meta name="robots" content={props.robots} />
    <meta name="google-site-verification" content={props.googleSiteVerification} />
    <LinkedData jsonLd={props.jsonLd} />

    {/* social media */}
    {props.openGraph && <OpenGraph openGraph={props.openGraph} />}
    <meta property="fb:pages" content={props.facebookPage} />
    <meta property="twitter:site" content={props.twitterSite} />

    {/* packaging */}
    <link
      rel="icon"
      type="image/png"
      href="https://www.ft.com/__origami/service/image/v2/images/raw/ftlogo-v1%3Abrand-ft-logo-square-coloured?source=update-logos&width=32&height=32&format=png"
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href="https://www.ft.com/__origami/service/image/v2/images/raw/ftlogo-v1%3Abrand-ft-logo-square-coloured?source=update-logos&width=194&height=194&format=png"
      sizes="194x194"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="https://www.ft.com/__origami/service/image/v2/images/raw/ftlogo-v1%3Abrand-ft-logo-square-coloured?source=update-logos&width=180&height=180&format=png"
    />
  </React.Fragment>
)

DocumentHead.defaultProps = {
  description:
    'News, analysis and comment from the Financial Times, the worldʼs leading global business publication',
  facebookPage: '8860325749',
  googleSiteVerification: '4-t8sFaPvpO5FH_Gnw1dkM28CQepjzo8UjjAkdDflTw',
  jsonLd: [],
  robots: 'index,follow',
  siteTitle: 'Financial Times',
  twitterSite: '@FinancialTimes'
}

export default DocumentHead
