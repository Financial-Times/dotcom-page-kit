import React from 'react'
import Layout from './Layout'

export default function Home({ greeting }) {
  return (
    <Layout siteName="Good Cats">
      <article>home... {greeting}</article>
    </Layout>
  )
}
