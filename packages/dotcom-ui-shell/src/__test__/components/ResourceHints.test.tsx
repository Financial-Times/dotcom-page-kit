import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/ResourceHints'

describe('dotcom-ui-shell/src/components/ResourceHints', () => {
  it('renders the given paths and URLs as resource hints', () => {
    const fixture = [
      'www.example.com/assets/style.css',
      'www.example.com/images/graphic.svg#icon',
      'http://polyfill.io/v3/bundle.min.js?features=es5,es6',
      '/assets/public/style.as83hd99.css'
    ]

    const tree = renderer.create(<Subject resourceHints={fixture} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
