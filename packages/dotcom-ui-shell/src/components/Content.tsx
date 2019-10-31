import React from 'react'

export type TContentProps = {
  contents?: string | React.ReactNode
}

const styles = {
  display: 'contents'
}

function Contents({ contents }: TContentProps) {
  if (typeof contents === 'string') {
    return <div style={styles} dangerouslySetInnerHTML={{ __html: contents }} />
  } else {
    return contents
  }
}

export default Contents
