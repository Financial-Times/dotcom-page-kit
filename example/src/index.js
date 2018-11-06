import React from 'react'
import './index.css'

export class Foo {
  hello = 'world'
}

async function start() {
  const Something = await import('./something')
  const something = new Something()
  something.doSomething()
}
