import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import { HeaderDefault, Drawer, HeaderSticky, LogoOnly } from '@financial-times/anvil-ui-ft-header/component'
import { Footer, LegalFooter } from '@financial-times/anvil-ui-ft-footer/component'

import headerProps from '../../../anvil-ui-ft-header/src/__stories__/story-data'
import footerProps from '../../../anvil-ui-ft-footer/src/__stories__/story-data'

import Layout from '..'

const fakeHandlebars = (n = 2) => {
  return Array.from(
    { length: n },
    () =>
      `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem laudantium nihil pariatur. Totam, rem beatae laborum reprehenderit sequi consectetur nam officiis. Veritatis nulla soluta quas dolores, placeat repudiandae modi debitis!<p>`
  ).join('')
}

const showFooter = () => boolean('Show footer', true)

storiesOf('FT / Layout', module)
  .addDecorator(withKnobs)
  .add('default components', () => {
    return (
      <Layout
        header={<HeaderDefault {...headerProps} />}
        footer={showFooter() && <Footer {...footerProps} />}
        footerAfter={<Drawer {...headerProps} />}>
        <main>
          <p>Children</p>
        </main>
      </Layout>
    )
  })
  .add('header & footer variants', () => {
    return (
      <Layout header={<HeaderSticky {...headerProps} />} footer={<LegalFooter {...footerProps} />}>
        <main dangerouslySetInnerHTML={{ __html: fakeHandlebars(10) }} />
      </Layout>
    )
  })
  .add('logo variant', () => {
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
