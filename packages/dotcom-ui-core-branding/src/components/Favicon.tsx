import React from 'react'
import imageServiceIconURL from '../lib/imageServiceIconURL'

export const Favicon = () => (
  <React.Fragment>
    {/* packaging */}
    <link
      rel="icon"
      type="image/png"
      href={imageServiceIconURL('ftlogo-v1:brand-ft-logo-square-coloured', 32)}
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href={imageServiceIconURL('ftlogo-v1:brand-ft-logo-square-coloured', 194)}
      sizes="194x194"
    />
    <link
      rel="apple-touch-icon"
      href={imageServiceIconURL('ftlogo-v1:brand-ft-logo-square-coloured', 180)}
      sizes="180x180"
    />
  </React.Fragment>
)

export default Favicon
