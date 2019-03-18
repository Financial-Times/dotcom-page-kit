import React from 'react'
import Layout from '@financial-times/anvil-ui-ft-layout'

function handleBtnClick() {
  alert('This is the home page...')
}

function Home({ PageNavigation }) {
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

export default {
  title: 'Home',
  description: 'The homepage',
  component: Home,
  getDependencies: async () => ({
    PageNavigation: (await import('../components/PageNavigation')).default
  })
}
