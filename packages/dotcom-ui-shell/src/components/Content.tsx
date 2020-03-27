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

  if (React.isValidElement(contents)) {
    return contents
  }

  return null
}

export default Content
