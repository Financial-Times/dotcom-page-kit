import React from 'react'
import Layout from './Layout'

export default function Home({ pageName, siteName, greeting }) {
  return (
    <Layout pageName={pageName} siteName={siteName}>
      <article>home... {greeting}</article>
    </Layout>
  )
}
