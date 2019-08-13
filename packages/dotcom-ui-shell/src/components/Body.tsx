import React from 'react'

export type TBodyProps = {
  contents?: string | React.ReactNode
}

const styles = {
  display: 'contents'
}

function Body({ contents }: TBodyProps) {
  if (typeof contents === 'string') {
    return <div style={styles} dangerouslySetInnerHTML={{ __html: contents }} />
  } else {
    return <div style={styles}>{contents}</div>
  }
}

export default Body
