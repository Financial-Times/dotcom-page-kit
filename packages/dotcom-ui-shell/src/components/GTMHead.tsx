import React from 'react'
import { TFlagsData } from '@financial-times/dotcom-ui-flags/src/types'

// This component is maintained by the ads team
type Props = {
  flags: TFlagsData
  appName?: string
}

// This component is maintained by the ads team
const GTMHead = ({ flags, appName }: Props) => {
  if (!flags.enableGTM) return null

  // 1) If appName is artcile-partner-content use the PC GTM instance
  const PCAppOverride =
    appName === 'article-partner-content' ? 'https://www.googletagmanager.com/gtm.js?id=GTM-12345' : null

  // 2) If appName is not Partner Content, use the standard FT.com GTM isntance and use the first-party GTM domain if flag is set.
  const src =
    PCAppOverride ??
    (flags['ads-first-party-gtm']
      ? 'https://www.ft.com/page-resources/'
      : 'https://www.googletagmanager.com/gtm.js?id=GTM-NWQJW68')

  const tagManager = `(function(w,d,s,l){
    w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='${src}'+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer');`

  return <script dangerouslySetInnerHTML={{ __html: tagManager }} />
}

GTMHead.defaultProps = {
  flags: {}
}

export default GTMHead
