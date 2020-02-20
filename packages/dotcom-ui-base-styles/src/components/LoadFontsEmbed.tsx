import React from 'react'
import { loadCustomFontsJS } from '../lib/fontLoading'

function LoadFontsEmbed() {
  return <script dangerouslySetInnerHTML={{ __html: loadCustomFontsJS }} />
}

export { LoadFontsEmbed }
