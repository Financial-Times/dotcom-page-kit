import React from 'react'

export type TContentProps = {
  contents?: string | React.ReactNode
}

const styles = {
  display: 'contents'
}

function Content({ contents }: TContentProps) {
  if (typeof contents === 'string') {
    return <div style={styles} dangerouslySetInnerHTML={{ __html: contents }} />
  }

  // We could try and validate this but there are so many possibilities
  // of node types and potentially nested arrays etc.
  if (contents) {
    return <React.Fragment>{contents}</React.Fragment>
  }

  return null
}

export default Content
