import React from 'react'
import { storiesOf } from '@storybook/react'

import { HeaderDefault, Drawer, HeaderSticky, LogoOnly } from '@financial-times/anvil-ui-ft-header/component'
import { Footer, LegalFooter } from '@financial-times/anvil-ui-ft-footer/component'

import headerProps from '@financial-times/anvil-ui-ft-header/__stories__/story-data'
import footerProps from '@financial-times/anvil-ui-ft-footer/__stories__/story-data'

import Layout from '../src'

const fakeHandlebars = (n = 2) => {
  return Array.from(
    { length: n },
    () =>
      `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem laudantium nihil pariatur. Totam, rem beatae laborum reprehenderit sequi consectetur nam officiis. Veritatis nulla soluta quas dolores, placeat repudiandae modi debitis!<p>`
  ).join('')
}

const story = storiesOf('FT / Layout', module)

story.add('default components', () => {
  return (
    <Layout
      headerBefore={fakeHandlebars()}
      header={<HeaderDefault {...headerProps} />}
      footerBefore={fakeHandlebars()}
      footer={<Footer {...footerProps} />}
      footerAfter={<Drawer {...headerProps} />}>
      <main>
        <p>Children</p>
      </main>
    </Layout>
  )
})

story.add('header & footer variants', () => {
  return (
    <Layout header={<HeaderSticky {...headerProps} />} footer={<LegalFooter {...footerProps} />}>
      <main dangerouslySetInnerHTML={{ __html: fakeHandlebars(10) }} />
    </Layout>
  )
})

story.add('logo variant', () => {
  return (
    <Layout
      header={<LogoOnly options={{ variant: 'simple' }} />}
      footerBefore={fakeHandlebars()}
      footer={<LegalFooter {...footerProps} />}>
      <main>
        <p>Children</p>
      </main>
    </Layout>
  )
})
