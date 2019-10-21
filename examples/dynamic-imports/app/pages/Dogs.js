import React from 'react'

export default {
  title: 'Dogs',
  description: 'The dogs page',
  component: DogsPage,
  getDependencies: async () => ({
    Page: (await import('../components/Page')).default,
    PageNavigation: (await import('../components/PageNavigation')).default
  })
}

function DogsPage({ Page, PageNavigation }) {
  return (
    <Page title="Dogs Page">
      <PageNavigation />
      <h1>Dogs</h1>
    </Page>
  )
}
