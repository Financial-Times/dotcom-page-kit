import React from 'react'

export default {
  title: 'Terms',
  description: 'The terms page',
  component: TermsPage,
  getDependencies: async () => ({
    Page: (await import('../components/Page')).default
  })
}

function TermsPage({ Page }) {
  return (
    <Page title="Terms">
      <h1>Terms</h1>
      <p>Some terms text...</p>
    </Page>
  )
}
