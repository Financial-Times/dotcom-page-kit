import React from 'react'
import FTHeader from '@financial-times/anvil-ui-ft-header'
import FTFooter from '@financial-times/anvil-ui-ft-footer'
import { placeholder, createSlotterFor, Renderable } from '@financial-times/anvil-ui-slots'

interface Props {
  children?: any
  bodySlot?: Renderable
  headerSlot?: Renderable
  footerSlot?: Renderable
}

FTLayout.body = placeholder()
FTLayout.header = placeholder()
FTLayout.footer = placeholder()

export default function FTLayout(props: Props) {
  const Slot = createSlotterFor(FTLayout, props)

  return (
    <React.Fragment>
      <header>
        <Slot name="header" Default={FTHeader} />
      </header>
      <main id="root">
        <Slot name="body" />
      </main>
      <footer>
        <Slot name="footer" Default={FTFooter} />
      </footer>
    </React.Fragment>
  )
}
