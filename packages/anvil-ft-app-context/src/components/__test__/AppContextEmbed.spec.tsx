import React from 'react'
import { AppContextEmbed } from '../AppContextEmbed'
import { prepareEmbedString } from '../../embedding/prepareEmbedString'
import { renderToStaticMarkup } from 'react-dom/server'
import { appContext } from '../../__fixtures__/appContext'

describe('AppContextEmbed', () => {
  it('renders the app context embed script', () => {
    const result = renderToStaticMarkup(<AppContextEmbed context={appContext} />)
    const expected = prepareEmbedString(appContext)
    expect(result).toBe(expected)
  })
})
