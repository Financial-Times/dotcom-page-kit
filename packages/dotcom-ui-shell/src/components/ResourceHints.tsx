import React from 'react'
import getResourceType from '../lib/getResourceType'

export type TResourceHintsProps = {
  resourceHints?: string[]
}

const ResourceHints = (props: TResourceHintsProps) => {
  return (
    <React.Fragment>
      <link rel="preconnect" href="https://spoor-api.ft.com" />
      <link rel="preconnect" href="https://session-next.ft.com" crossOrigin="use-credentials" />
      <link rel="preconnect" href="https://ads-api.ft.com" />
      <link rel="preconnect" href="https://polyfill.io" />
      <link rel="preconnect" href="https://www.googletagservices.com" />

      {props.resourceHints.map((resource, i) => {
        const type = getResourceType(resource)
        return <link key={`hint-${i}`} rel="preload" type={type} href={resource} />
      })}
    </React.Fragment>
  )
}

ResourceHints.defaultProps = {
  resourceHints: []
}

export default ResourceHints
