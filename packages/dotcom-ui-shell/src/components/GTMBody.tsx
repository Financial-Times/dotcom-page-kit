import React from 'react'
import { TFlagsData } from '@financial-times/dotcom-ui-flags/src/types'

// This component is maintained by the ads team
const GTMBody = ({ flags }: { flags: TFlagsData }) => {
  if (!flags.enableGTM) {
    return null
  }

  const src = flags['ads-first-party-gtm']
    ? '/page-resources'
    : 'https://www.googletagmanager.com/ns.html?id=GTM-NWQJW68'

  return (
    <noscript>
      <iframe
        src={src}
        height="0"
        width="0"
        style={{
          display: 'none',
          visibility: 'hidden'
        }}
      />
    </noscript>
  )
}

GTMBody.defaultProps = {
  flags: {}
}

export default GTMBody
