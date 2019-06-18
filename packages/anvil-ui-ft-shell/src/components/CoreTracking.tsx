import React from 'react'

export default function CoreTracking({ app }) {
  const noJS = JSON.stringify({
    category: 'page',
    action: 'view',
    system: {
      source: 'non-ctm'
    },
    context: {
      product: 'next',
      app: app,
      data: { source: 'noscript' }
    }
  })

  // NOTE: This will be stringified and embedded so use ES5 only!
  function coreExperience() {
    if (/\bcore\b/.test(document.documentElement.className)) {
      var data = JSON.stringify({
        category: 'page',
        action: 'view',
        system: {
          source: 'non-ctm'
        },
        context: {
          product: 'next',
          app: app,
          data: { source: 'core-experience' }
        }
      })

      var img = new Image()

      img.src = 'https://spoor-api.ft.com/px.gif?data=' + encodeURIComponent(data)
    }
  }

  return (
    <React.Fragment>
      <script dangerouslySetInnerHTML={{ __html: '(' + coreExperience.toString() + ')();' }} />
      <noscript>
        <img src={`https://spoor-api.ft.com/px.gif?data=${encodeURIComponent(noJS)}`} />
      </noscript>
    </React.Fragment>
  )
}
