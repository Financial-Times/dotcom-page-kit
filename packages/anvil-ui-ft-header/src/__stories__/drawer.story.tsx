import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { OrigamiBuildService } from '@financial-times/anvil-ui-origami-build-service'

import FakeHeader from './_header'
import Drawer from '../drawer'

import storyData from './data/menus.json'

const origamiDeps = {
  'o-header': '^7.7.0',
  'o-colors': '^4.0.1',
  'o-normalise': '^1.6.2',
  'o-typography': '^5.0.1'
}

const { user, anon } = storyData
const { items: ukItems } = storyData['drawer-uk']
const { items: internationalItems } = storyData['drawer-international']

const ukEditions = {
  current: { name: 'UK Edition' },
  others: [{ id: 'edition2', name: 'International Edition', url: '#' }]
}
const internationalEditions = {
  current: { name: 'International Edition' },
  others: [{ id: 'edition1', name: 'UK Edition', url: '#' }]
}

const getUrls = (items) => items.map((item) => item.url)

//  SB config
//------------------------------------------------------------------------------
const story = storiesOf('FT / Drawer', module)
story.addDecorator(withKnobs)

const getCurrentUrlOpts = (urls: string[]) => select('currentUrl', urls, '/')

// Stories
//------------------------------------------------------------------------------
story.add('default', () => {
  return (
    <OrigamiBuildService dependencies={origamiDeps}>
      <Drawer sections={ukItems} user={anon.items} />
    </OrigamiBuildService>
  )
})

story.add('user logged in', () => {
  const currentUrl = getCurrentUrlOpts(getUrls(ukItems[0].submenu.items))

  return (
    <OrigamiBuildService dependencies={origamiDeps}>
      <Drawer editions={ukEditions} sections={ukItems} user={user.items} currentUrl={currentUrl} />
    </OrigamiBuildService>
  )
})

story.add('international', () => {
  const currentUrl = getCurrentUrlOpts(getUrls(internationalItems[0].submenu.items))

  return (
    <OrigamiBuildService dependencies={origamiDeps}>
      <FakeHeader />
      <Drawer
        editions={internationalEditions}
        sections={internationalItems}
        user={user.items}
        currentUrl={currentUrl}
      />
    </OrigamiBuildService>
  )
})
