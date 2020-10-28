import React from 'react'
import { OnReady } from '../../../../.storybook/components/OnReady'

import './demos.scss'
import '../../styles.scss'

import * as layout from '../../browser'

import { navigationProps } from '../../../../__fixtures__/navigation'

import { Layout } from '..'

const Extra = ({ children }) => <p className="extra">{children}</p>

const initUiComponents = () => {
  layout.init()
}

export default {
  title: 'FT / Layout'
}

export const DefaultComponents = (args) => {
  return (
    <OnReady callback={initUiComponents}>
      <Layout navigationData={navigationProps} {...args}>
        <main className="demo">
          <p className="demo__message">Defaults: only passing data</p>
        </main>
      </Layout>
    </OnReady>
  )
}

DefaultComponents.story = {
  name: 'Default components'
}
DefaultComponents.args = {
  headerVariant: 'simple',
  footerVariant: 'simple'
}
DefaultComponents.argTypes = {
  headerVariant: {
    control: {
      type: 'select',
      options: {
        Simple: 'simple',
        'Large Logo': 'large-logo',
        'Logo Only': 'logo-only',
        None: ''
      }
    }
  },
  footerVariant: {
    control: {
      type: 'select',
      options: {
        Simple: 'simple',
        Legal: 'legal',
        None: ''
      }
    }
  }
}

export const CustomSlots = () => {
  return (
    <OnReady callback={initUiComponents}>
      <Layout
        navigationData={navigationProps}
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
}

CustomSlots.story = {
  name: 'Custom slots'
}

export const CustomComponents = () => {
  return (
    <OnReady callback={initUiComponents}>
      <Layout
        navigationData={navigationProps}
        headerComponent={<Extra>Custom header</Extra>}
        footerComponent={<Extra>Custom footer</Extra>}>
        <main className="demo">
          <p className="demo__message">Custom components</p>
        </main>
      </Layout>
    </OnReady>
  )
}

CustomComponents.story = {
  name: 'Custom components'
}
