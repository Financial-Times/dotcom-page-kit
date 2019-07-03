import React from 'react'

export type TLinkedDataProps = {
  jsonLd?: { [key: string]: any }
}

const LinkedData = ({ jsonLd }: TLinkedDataProps) => (
  <React.Fragment>
    {Array.isArray(jsonLd) &&
      jsonLd.map((data, i) => (
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

LinkedData.defaultProps = {
  jsonLd: []
}

export default LinkedData
