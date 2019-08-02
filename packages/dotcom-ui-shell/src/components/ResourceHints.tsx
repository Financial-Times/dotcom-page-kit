import React from 'react'
import getResourceType from '../lib/getResourceType'

export type TResourceHintsProps = {
  resourceHints: string[]
}

const ResourceHints = (props: TResourceHintsProps) => {
  return (
    <React.Fragment>
      {props.resourceHints.map((resource) => {
        const type = getResourceType(resource)
        return <link rel="preload" type={type} href={resource} />
      })}
    </React.Fragment>
  )
}

ResourceHints.defaultProps = {
  resourceHints: []
}

export default ResourceHints
