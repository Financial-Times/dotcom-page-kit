import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default ({ siteName, pageTitle, children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{pageTitle ? `${pageTitle} | ${siteName}` : siteName}</title>
      <link rel="stylesheet" href="public/styles.css" />
    </head>
    <body>
      <header role="banner">
        <Header siteName={siteName} />
      </header>
      <main role="main">{children}</main>
      <footer role="contentinfo">
        <Footer siteName={siteName} />
      </footer>
    </body>
  </html>
)
