import React from 'react'

export type TBodyProps = {
  contents?: any
}

function Body({ contents }) {
  if (typeof contents === 'string') {
    return <body dangerouslySetInnerHTML={{ __html: contents }} />
  } else {
    return <body>{contents}</body>
  }
}

export default Body
