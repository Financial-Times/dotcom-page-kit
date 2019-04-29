import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/LinkedData'

describe('anvil-ui-ft-shell/src/components/LinkedData', () => {
  it('renders the base site schema', () => {
    const tree = renderer.create(<Subject />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the given additional schemas', () => {
    const fixture = [
      {
        '@context': 'http://schema.org',
        '@type': 'Person',
        name: 'John Doe',
        email: 'john.doe@example.com',
        netWorth: '1 trillion'
      },
      {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        url: 'https://www.ft.com',
        address: 'Bracken House, EC4M 9JA'
      }
    ]

    const tree = renderer.create(<Subject jsonLd={fixture} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
