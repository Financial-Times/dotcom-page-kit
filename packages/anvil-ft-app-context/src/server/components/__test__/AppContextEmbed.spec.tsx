import React from 'react'
import { appContext } from '../../../__fixtures__/appContext'
import { AppContextEmbed } from '../AppContextEmbed'
import { prepareEmbedString } from '../../../shared/prepareEmbedString'
import { renderToStaticMarkup } from 'react-dom/server'

describe('AppContextEmbed', () => {
  it('renders the app context embed script', () => {
    const result = renderToStaticMarkup(<AppContextEmbed context={appContext} />)
    const expected = prepareEmbedString(appContext)
    expect(result).toBe(expected)
  })
})
