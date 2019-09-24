import React from 'react'

export type TSocialMediaProps = {
  facebookPage?: string
  twitterSite?: string
}

export const SocialMedia = (props: TSocialMediaProps) => (
  <React.Fragment>
    <meta property="fb:pages" content={props.facebookPage} />
    <meta property="twitter:site" content={props.twitterSite} />
  </React.Fragment>
)

SocialMedia.defaultProps = {
  twitterSite: '@FinancialTimes',
  facebookPage: '8860325749'
}

export default SocialMedia
