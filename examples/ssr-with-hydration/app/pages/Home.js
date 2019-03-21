import React from 'react'
import Layout from '@financial-times/anvil-ui-ft-layout'

export default {
  title: 'Home',
  description: 'The homepage',
  component: Homepage,
  getDependencies: async () => ({
    PageNavigation: (await import('../components/PageNavigation')).default
  })
}

function Homepage({ PageNavigation }) {
  return (
    <Layout header={<PageNavigation />}>
      <div>
        <h1>Home</h1>
        <button id="btn" onClick={handleBtnClick}>
          Click me
        </button>
      </div>
    </Layout>
  )
}

function handleBtnClick() {
  alert('This is the home page...')
}
