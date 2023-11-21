import React from 'react'
import dynamic from 'next/dynamic'

const ClientOnly = dynamic(
  async () => {
    const { ExampleClientOnly: Component } = await import('../components/ExampleClientOnly')
    return { default: Component }
  },
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
)

const HelloWorld = () => (
  <article
    style={{
      display: 'flex',
      flex: '1 1 100%',
      justifyContent: 'center',
      paddingTop: '200px',
      paddingBottom: '200px'
    }}
  >
    <section>
      <p>Hello World</p>
      <ClientOnly />
    </section>
  </article>
)

export default HelloWorld
