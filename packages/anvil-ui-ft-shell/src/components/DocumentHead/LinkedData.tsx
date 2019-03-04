import React from 'react'

export interface TLinkedDataObject {
  [key: string]: any
}

export interface TLinkedDataProps {
  jsonLd: TLinkedDataObject[]
}

export default ({ jsonLd }: TLinkedDataProps) => (
  <React.Fragment>
    {jsonLd.map((data, i) => (
      <script
        key={`jsonld-${i}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data)
        }}
      />
    ))}
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
