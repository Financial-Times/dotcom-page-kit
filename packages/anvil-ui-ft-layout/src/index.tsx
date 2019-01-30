import React from 'react'
import FTHeader from '@financial-times/anvil-ui-ft-header'
import { Footer } from '@financial-times/anvil-ui-ft-footer'
import { placeholder, createSlotterFor, Renderable } from '@financial-times/anvil-ui-slots'

interface Props {
  children?: any
  bodySlot?: Renderable
  headerSlot?: Renderable
  footerSlot?: Renderable
}

interface Foo extends React.FC<Props> {
  body?: any
  header?: any
  footer?: any
}

const FTLayout: Foo = (props) => {
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
        <Slot name="footer" Default={Footer} />
      </footer>
    </React.Fragment>
  )
}

FTLayout.body = placeholder()
FTLayout.header = placeholder()
FTLayout.footer = placeholder()

export default FTLayout
