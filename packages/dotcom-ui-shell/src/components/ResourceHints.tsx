import React from 'react'
import getResourceType from '../lib/getResourceType'

export type TResourceHintsProps = {
  resourceHints?: string[]
}

const ResourceHints = (props: TResourceHintsProps) => {
  return (
    <React.Fragment>
      {/*
        Spoor is the API which receives the tracking events sent by the o-tracking library
        <https://github.com/Financial-Times/o-tracking>
      */}
      <link rel="preconnect" href="https://spoor-api.ft.com" />
      {/*
        The session API is used to validate users and retrieve information about them
        <https://github.com/Financial-Times/next-session-client>
      */}
      <link rel="preconnect" href="https://session-next.ft.com" crossOrigin="use-credentials" />
      {/*
        The ads API is used to fetch ad targeting information for the current page
        <https://github.com/Financial-Times/next-ads-api>
      */}
      <link rel="preconnect" href="https://ads-api.ft.com" />
      {/*
        The Google Publisher Tag library (GPT) is hosted here which is used to deliver ads
        <https://github.com/Financial-Times/o-ads/blob/master/src/js/ad-servers/gpt.js>
      */}
      <link rel="preconnect" href="https://securepubads.g.doubleclick.net" />


      {props.resourceHints.map((resource, i) => {
        const type = getResourceType(resource)
        return <link key={`hint-${i}`} rel="preload" as={type} href={resource} />
      })}
    </React.Fragment>
  )
}

ResourceHints.defaultProps = {
  resourceHints: []
}

export default ResourceHints
