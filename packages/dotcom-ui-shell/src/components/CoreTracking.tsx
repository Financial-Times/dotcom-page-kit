import React from 'react'

const pixel = 'https://spoor-api.ft.com/px.gif?data='

export default function CoreTracking({ context }) {
  const trackingData = {
    category: 'page',
    action: 'view',
    system: {
      source: 'non-ctm'
    },
    context: {
      ...context,
      product: 'next',
      data: { source: 'SOURCE' }
    }
  }

  const encodedTrackingData = encodeURIComponent(JSON.stringify(trackingData))

  // NOTE: This function will be stringified and embedded so use ES5 only!
  function coreExperience() {
    if (/\bcore\b/.test(document.documentElement.className)) {
      var currentScript = document.scripts[document.scripts.length - 1]
      var img = new Image()

      img.src = currentScript.getAttribute('data-pixel-src')
    }
  }

  return (
    <React.Fragment>
      <script
        data-pixel-src={pixel + encodedTrackingData.replace('SOURCE', 'core-experience')}
        dangerouslySetInnerHTML={{ __html: '(' + coreExperience.toString() + ')();' }}
      />
      <noscript>
        <img src={pixel + encodedTrackingData.replace('SOURCE', 'no-js')} />
      </noscript>
    </React.Fragment>
  )
}
