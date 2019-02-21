import React from 'react'
import { TDocumentHeadProps } from './props'

const JsonLD = ({ metadata }: TDocumentHeadProps) => (
  <React.Fragment>
    {metadata && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadata)
        }}
      />
    )}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          name: 'Financial Times',
          alternateName: 'FT.com',
          url: 'http://www.ft.com'
        })
      }}
    />
  </React.Fragment>
)

export default JsonLD
