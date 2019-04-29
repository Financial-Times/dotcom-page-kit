import React from 'react'

export type TBodyProps = {
  contents?: any
}

function Body({ contents, ...bodyAttributes }: TBodyProps) {
  if (typeof contents === 'string') {
    return <body {...bodyAttributes} dangerouslySetInnerHTML={{ __html: contents }} />
  } else {
    return <body {...bodyAttributes}>{contents}</body>
  }
}

export default Body
