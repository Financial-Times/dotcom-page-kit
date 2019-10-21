import React from 'react'

export default {
  title: 'Home',
  description: 'The homepage',
  component: Homepage,
  getDependencies: async () => ({
    Page: (await import('../components/Page')).default,
    PageNavigation: (await import('../components/PageNavigation')).default
  })
}

function Homepage({ Page, PageNavigation }) {
  return (
    <Page title="Home">
      <PageNavigation />
      <h1>Home</h1>
    </Page>
  )
}
