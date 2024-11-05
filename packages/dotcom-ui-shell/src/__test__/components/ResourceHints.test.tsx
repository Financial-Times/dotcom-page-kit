import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/ResourceHints'

describe('dotcom-ui-shell/src/components/ResourceHints', () => {
  it('renders the given paths and URLs as resource hints', () => {
    const fixture = [
      'www.example.com/assets/style.css',
      'www.example.com/images/graphic.svg#icon',
      '/assets/public/style.as83hd99.css',
      '/__origami/service/build/v3/font?font_format=woff2&font_name=FinancierDisplayWeb-Bold&system_code=page-kit&version=1.12'
    ]

    const tree = renderer.create(<Subject resourceHints={fixture} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
