import React from 'react'
import { OnReady } from '@financial-times/anvil-ui-ft-on-ready'

import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import './demos.scss'
import '../../styles.scss'

import * as layout from '../../browser'

import { data as headerProps } from '../../../../__fixtures__/navigation'

import { Layout } from '..'

const Extra = ({ children }) => <p className="extra">{children}</p>

const switchHeader = () =>
  select('Switch header', {
    Standard: 'simple',
    'Large Logo': 'large-logo',
    'Logo Only': 'logo-only',
    None: ''
  })
const switchFooter = () => select('Switch footer', { Standard: 'simple', Legal: 'legal', None: '' })

const initUiComponents = () => {
  layout.init()
}

storiesOf('FT / Layout', module)
  .addDecorator(withKnobs)
  .add('Default components', () => {
    return (
      <OnReady callback={initUiComponents}>
        <Layout navigationData={headerProps} header={switchHeader()} footer={switchFooter()}>
          <main className="demo">
            <p className="demo__message">Defaults: only passing data</p>
          </main>
        </Layout>
      </OnReady>
    )
  })
  .add('Custom slots', () => {
    return (
      <OnReady callback={initUiComponents}>
        <Layout
          navigationData={headerProps}
          headerBefore={<Extra>Header before</Extra>}
          headerAfter={<Extra>Header after</Extra>}
          footerBefore={<Extra>Footer before</Extra>}
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
        <Layout
          navigationData={headerProps}
          header={<Extra>Custom header</Extra>}
          footer={<Extra>Custom footer</Extra>}>
          <main className="demo">
            <p className="demo__message">Custom components</p>
          </main>
        </Layout>
      </OnReady>
    )
  })
