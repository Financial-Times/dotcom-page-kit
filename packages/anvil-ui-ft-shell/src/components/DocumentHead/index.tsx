import React from 'react'
import OpenGraph from './OpenGraph'
import JsonLD from './JsonLD'
import StyleSheets from './StyleSheets'
import Scripts from './Scripts'

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
  url?: string
}

const DocumentHead = (props: TDocumentHeadProps) => (
  <React.Fragment>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>{props.pageTitle ? `${props.pageTitle} | ${props.siteTitle}` : props.siteTitle}</title>
    <meta name="description" content={props.description} />
    {props.url && <link rel="canonical" href={props.url} />}

    {/* resource hints */}
    <link rel="preconnect" href="https://spoor-api.ft.com" />
    <link rel="preconnect" href="https://session-next.ft.com" crossorigin="use-credentials" />
    <link rel="preconnect" href="https://ads-api.ft.com" />
    <link rel="preconnect" href="https://www.googletagservices.com" />

    {/* assets */}
    <StyleSheets {...props} />
    <Scripts {...props} />

    {/* SEO */}
    <meta name="robots" content={props.robots} />
    <meta name="google-site-verification" content={props.googleSiteVerification} />
    {props.enableJsonLD && <JsonLD {...props} />}
    {props.enableOpenGraph && <OpenGraph {...props} />}
  </React.Fragment>
)

DocumentHead.defaultProps = {
  description:
    'News, analysis and comment from the Financial Times, the worldʼs leading global business publication',
  robots: 'index,follow',
  siteTitle: 'Financial Times',
  googleSiteVerification: '4-t8sFaPvpO5FH_Gnw1dkM28CQepjzo8UjjAkdDflTw'
}

export default DocumentHead
