import React from 'react'
import FTShell from '@financial-times/anvil-ui-ft-shell'
import FTHeader from '@financial-times/anvil-ui-ft-header'
import FTFooter from '@financial-times/anvil-ui-ft-footer'

interface Props {
  children: any
}

export default function Layout({ children }: Partial<Props>) {
  return (
    <FTShell>
      <header>
        <FTHeader />
      </header>
      <main>{children}</main>
      <header>
        <FTFooter />
      </header>
    </FTShell>
  )
}
