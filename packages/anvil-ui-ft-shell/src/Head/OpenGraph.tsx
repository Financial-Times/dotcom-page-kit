import React from 'react'

const OpenGraph = ({
  description,
  facebookDescription,
  facebookHeadline,
  facebookImage,
  facebookPage,
  mainImage,
  pageTitle,
  siteTitle,
  socialDescription,
  socialHeadline,
  socialImage,
  summary,
  twitterCard,
  twitterDescription,
  twitterHeadline,
  twitterImage,
  twitterSite,
  url
}) => (
  <React.Fragment>
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content={siteTitle} />

    <meta name="twitter:title" content={twitterHeadline || socialHeadline || pageTitle || siteTitle} />
    <meta property="og:title" content={facebookHeadline || socialHeadline || pageTitle || siteTitle} />

    <meta
      name="twitter:description"
      content={twitterDescription || socialDescription || summary || description}
    />
    <meta
      property="og:description"
      content={facebookDescription || socialDescription || summary || description}
    />

    <meta name="twitter:url" content={url} />
    <meta property="og:url" content={url} />

    {(twitterImage || socialImage || mainImage) && (
      <meta name="twitter:image" content={twitterImage || socialImage || mainImage} />
    )}
    {(facebookImage || socialImage || mainImage) && (
      <meta property="og:image" content={facebookImage || socialImage || mainImage} />
    )}

    <meta property="fb:pages" content={facebookPage} />
    <meta name="twitter:card" content={twitterCard} />
    <meta name="twitter:site" content={twitterSite} />
  </React.Fragment>
)

OpenGraph.defaultProps = {
  facebookPage: '8860325749',
  twitterSite: '@FinancialTimes',
  twitterCard: 'summary_large_image'
}

export default OpenGraph
