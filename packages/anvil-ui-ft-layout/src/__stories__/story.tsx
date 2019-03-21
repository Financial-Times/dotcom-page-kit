import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import { HeaderDefault, Drawer, HeaderSticky, LogoOnly } from '@financial-times/anvil-ui-ft-header/component'
import { Footer, LegalFooter } from '@financial-times/anvil-ui-ft-footer/component'

import headerData from '../../../anvil-ui-ft-header/src/__stories__/story-data'
import footerData from '../../../anvil-ui-ft-footer/src/__stories__/story-data'

import { Layout, Template } from '..'

const fakeHandlebars = (n = 2) => {
  return Array.from(
    { length: n },
    () =>
      `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem laudantium nihil pariatur. Totam, rem beatae laborum reprehenderit sequi consectetur nam officiis. Veritatis nulla soluta quas dolores, placeat repudiandae modi debitis!<p>`
  ).join('')
}

const hideFooter = () => boolean('Hide footer')

storiesOf('FT / Layout', module)
  .addDecorator(withKnobs)
  .add('default components', () => {
    const headerProps = { ...headerData, hideOutboundLinks: hideFooter() }

    return (
      <Layout
        header="HeaderDefault"
        // header={<HeaderDefault {...headerProps} />}
        footer={<Footer {...footerData} />}
        hideOutboundLinks={headerProps.hideOutboundLinks}>
        <main>
          <p>Children</p>
        </main>
      </Layout>
    )
  })
  .add('header & footer variants', () => {
    return (
      <Layout
        header={<HeaderSticky {...headerData} />}
        footer={<LegalFooter {...footerData} />}
        hideOutboundLinks={hideFooter()}>
        <h1>Usage of a template:</h1>
        <Template contents={fakeHandlebars(10)} />
      </Layout>
    )
  })
  .add('logo variant', () => {
    return (
      <Layout
        header={<LogoOnly options={{ variant: 'simple' }} />}
        footerBefore={fakeHandlebars()}
        footer={<LegalFooter {...footerData} />}>
        <main>
          <p>Children</p>
        </main>
      </Layout>
    )
  })
