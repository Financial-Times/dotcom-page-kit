import React from 'react'
import OpenGraph, { TOpenGraphProps } from './OpenGraph'
import LinkedData, { TLinkedDataProps } from './LinkedData'
import { Favicon, Title, Description, SocialMedia } from '@financial-times/dotcom-core-branding/component'

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
    additionalMetadata?: React.ReactNode
  }

const DocumentHead = (props: TDocumentHeadProps) => (
  <React.Fragment>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <Title pageTitle={props.pageTitle} siteTitle={props.siteTitle} />

    <Description description={props.description} />

    {props.canonicalURL && <link rel="canonical" href={props.canonicalURL} />}

    {/* SEO */}
    <meta name="robots" content={props.robots} />
    <meta name="google-site-verification" content={props.googleSiteVerification} />
    {props.metaTags.map((attributes, i) => (
      <meta key={`meta-${i}`} {...attributes} />
    ))}
    <LinkedData jsonLd={props.jsonLd} />

    <SocialMedia facebookPage={props.facebookPage} twitterSite={props.twitterSite} />

    <OpenGraph openGraph={props.openGraph} />

    <Favicon />

    {/* We can't add an option for every single metadata option so allow custom elements to be inserted*/}
    {props.additionalMetadata}
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
  additionalMetadata: null
}

export default DocumentHead
