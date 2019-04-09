import React from 'react'
import { OnReady } from '@financial-times/anvil-ui-ft-on-ready'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import './demos.scss'

import * as header from '@financial-times/anvil-ui-ft-header/browser.js'
import * as footer from '@financial-times/anvil-ui-ft-footer/browser.js'

import { data as headerProps } from '../../../../__fixtures__/navigation'

import { Layout, Template } from '..'

const Extra = ({ children }) => <p className="extra">{children}</p>

const hideFooter = () => boolean('Hide outbound links', false)
const switchFooter = () => select('Switch footer', { Standard: 'simple', Legal: 'legal' })
const switchDisplay = () => boolean('Toggle {display: contents} on <Template />', false)

const initUiComponents = () => {
  header.init()
  footer.init()
}

storiesOf('FT / Layout', module)
  .addDecorator(withKnobs)
  .add('Default components', () => {
    return (
      <OnReady callback={initUiComponents}>
        <Layout props={headerProps}>
          <main className="demo">
            <p className="demo__message">Defaults: only passing data</p>
          </main>
        </Layout>
      </OnReady>
    )
  })
  .add('Logo-only header', () => {
    const props = { ...headerProps, hideOutboundLinks: hideFooter() }

    return (
      <OnReady callback={initUiComponents}>
        <Layout props={props} header="logo-only" footer={switchFooter()}>
          <main className="demo">
            <p className="demo__message">Logo only</p>
          </main>
        </Layout>
      </OnReady>
    )
  })
  .add('Sticky header', () => {
    const props = { ...headerProps, hideOutboundLinks: hideFooter() }

    return (
      <OnReady callback={initUiComponents}>
        <Layout props={props} header="sticky" footer={switchFooter()}>
          <main className="demo">
            <p className="demo__message demo__message--scroll">Scroll down</p>
          </main>
        </Layout>
      </OnReady>
    )
  })
  .add('Custom slots', () => {
    return (
      <OnReady callback={initUiComponents}>
        <Layout
          props={headerProps}
          footer="legal"
          headerBefore={<Extra>Header before</Extra>}
          headerAfter={<Extra>Header after</Extra>}
          footerAfter={<Extra>Footer after</Extra>}>
          <main className="demo">
            <p className="demo__message">Custom content slots</p>
          </main>
        </Layout>
      </OnReady>
    )
  })
  .add('Custom components', () => {
    return (
      <OnReady callback={initUiComponents}>
        <Layout props={headerProps} footer={<Extra>Custom footer</Extra>}>
          <main className="demo">
            <p className="demo__message">Custom components</p>
          </main>
        </Layout>
      </OnReady>
    )
  })
  .add('Template utility', () => {
    const theCrocodile = `
    <p>How doth the little crocodile </p>
    <p>Improve his shining tail</p>`

    const cls = switchDisplay() ? 'demo__message--contents' : ''

    return (
      <main className="demo demo--flexed">
        <Template className={`demo__message ${cls}`}>{theCrocodile}</Template>
      </main>
    )
  })
