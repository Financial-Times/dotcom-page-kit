import React from 'react'
import Layout from './Layout'
import CatList from './CatList'

export default function Home({ pageTitle, siteName, data }) {
  return (
    <Layout pageTitle={pageTitle} siteName={siteName}>
      <h1 className="Page-title">{pageTitle}</h1>
      <div className="Page-content">
        <CatList data={data} />
      </div>
    </Layout>
  )
}
