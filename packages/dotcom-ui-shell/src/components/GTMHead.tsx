import React from 'react'
import { TFlagsData } from '@financial-times/dotcom-ui-flags/src/types'

// This component is maintained by the ads team
const GTMHead = ({ flags }: { flags: TFlagsData }) => {
  if (!flags.enableGTM) {
    return null
  }

  const src = flags['ads-first-party-gtm']
    ? '/page-resources'
    : 'https://www.googletagmanager.com/gtm.js?id=GTM-NWQJW68'

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
