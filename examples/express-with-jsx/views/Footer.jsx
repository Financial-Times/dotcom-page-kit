import React from 'react'

export default ({ siteName }) => (
  <div className="Footer">
    <p className="Footer-text">
      <small>{`© ${new Date().getFullYear()} ${siteName} inc.`}</small>
    </p>
  </div>
)
