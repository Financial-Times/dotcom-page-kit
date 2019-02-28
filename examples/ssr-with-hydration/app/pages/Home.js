import React from 'react'

export default {
  title: 'Home',
  description: 'The homepage',
  component: Homepage,
  getDependencies: async () => ({
    Page: (await import('../components/Page')).default
  })
}

function Homepage({ Page }) {
  return (
    <Page>
      <Page.Header>
        <h1>Home</h1>
      </Page.Header>
      <Page.Body>
        <button id="btn" onClick={handleBtnClick}>
          Click me
        </button>
      </Page.Body>
    </Page>
  )
}

function handleBtnClick() {
  alert('This is the home page...')
}
