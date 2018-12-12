import React from 'react'
import Page from '@financial-times/anvil-ui-ft-layout'

export default function Home({ greeting }) {
  return (
    <Page>
      <Page.body>
        <article>home... {greeting}</article>
      </Page.body>
    </Page>
  )
}
