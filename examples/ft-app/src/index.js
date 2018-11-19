import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './index.scss'

function Index() {
  const [text, setText] = useState('some text')

  useEffect(
    async () => {
      const { data } = await import('./data')
      setText(data.name)
    },
    [text]
  )

  return <div>Hello React {text}</div>
}

ReactDOM.render(<Index />, document.getElementById('index'))
