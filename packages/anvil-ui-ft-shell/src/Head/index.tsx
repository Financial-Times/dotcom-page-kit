import React from 'react'

const HtmlHead = (props) => (
  <React.Fragment>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>{props.pageTitle ? `${props.pageTitle} | ${props.siteTitle}` : props.siteTitle}</title>
    <meta name="description" content={props.description || props.summary} />
    <link rel="canonical" href={props.url} />

    {/* resource hints */}
    <link rel="preconnect" href="https://spoor-api.ft.com" />
    <link rel="preconnect" href="https://session-next.ft.com" crossorigin="use-credentials" />
    <link rel="preconnect" href="https://ads-api.ft.com" />
    <link rel="preconnect" href="https://www.googletagservices.com" />

    {/* SEO */}
    <meta name="robots" content={props.robots} />
    <meta name="google-site-verification" content={props.googleSiteVerification} />

    {props.children}
  </React.Fragment>
)

HtmlHead.defaultProps = {
  description:
    'News, analysis and comment from the Financial Times, the worldʼs leading global business publication',
  robots: 'index,follow',
  siteTitle: 'Financial Times',
  googleSiteVerification: '4-t8sFaPvpO5FH_Gnw1dkM28CQepjzo8UjjAkdDflTw'
}

export default HtmlHead
