import React from 'react'
import { storiesOf } from '@storybook/react'

import Layout from '../src'

storiesOf('FT / Layout', module)
  .add('by default', () => {
    return (
      <Layout>
        <Layout.body>body...</Layout.body>
      </Layout>
    )
  })
  .add('with custom slots', () => {
    return (
      <Layout>
        <Layout.header>custom header...</Layout.header>
        <Layout.body>body...</Layout.body>
        <Layout.footer>custom footer...</Layout.footer>
      </Layout>
    )
  })
  .add('with slots as string props', () => {
    return <Layout headerSlot="string header..." footerSlot="string footer..." bodySlot="string body..." />
  })
  .add('with slots as component function props', () => {
    const Header = () => 'header...'
    const Footer = () => 'footer...'
    const Body = () => 'body...'
    return <Layout headerSlot={Header} footerSlot={Footer} bodySlot={Body} />
  })
  .add('with slots as rendered component props', () => {
    const Header = () => 'header...'
    const Footer = () => 'footer...'
    const Body = () => 'body...'
    return <Layout headerSlot={<Header />} footerSlot={<Footer />} bodySlot={<Body />} />
  })
