import React from 'react'
import { Footer } from '@financial-times/anvil-ui-ft-footer'
import { HeaderMain } from '@financial-times/anvil-ui-ft-header'
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
        <Slot name="header" Default={HeaderMain} />
      </header>
      <main id="root">
        <Slot name="body" />
      </main>
      <footer>
        <Slot name="footer" Default={Footer} />
      </footer>
    </React.Fragment>
  )
}
