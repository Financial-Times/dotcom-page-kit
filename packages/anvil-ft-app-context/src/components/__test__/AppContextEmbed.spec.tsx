import React from 'react'
import { appContext } from '../../client/__test__/fixtures'
import { prepareEmbedString } from '../../helpers/prepareEmbedString'
import { renderToStaticMarkup } from 'react-dom/server'
import { AppContextEmbed } from '../AppContextEmbed'

describe('AppContextEmbed', () => {
  it('renders the app context embed script', () => {
    const result = renderToStaticMarkup(<AppContextEmbed context={appContext} />)
    const expected = prepareEmbedString(appContext)
    expect(result).toBe(expected)
  })
})
