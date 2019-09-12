import React from 'react'
import { TFlagsData } from '@financial-times/dotcom-ui-flags/src/types'

// This component is maintained by the ads team
const GTMHead = ({ flags }: { flags: TFlagsData }) => {
  if (!flags.enableGTM) {
    return null
  }

  const tagManager = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NWQJW68');`

  return <script dangerouslySetInnerHTML={{ __html: tagManager }} />
}

GTMHead.defaultProps = {
  flags: {}
}

export default GTMHead
