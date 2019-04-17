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
      <div>
        <h1>Home</h1>
        <button id="btn" onClick={handleBtnClick}>
          Click me
        </button>
      </div>
    </Page>
  )
}

function handleBtnClick() {
  alert('This is the home page...')
}
