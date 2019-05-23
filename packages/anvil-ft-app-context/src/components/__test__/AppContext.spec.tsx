import React from 'react'
import { AppContext } from '../AppContext'
import { appContext } from '../../client/__test__/fixtures'
import { renderToStaticMarkup } from 'react-dom/server'
import { APP_CONTEXT_ELEMENT_ID } from '../../constants'

describe('AppContext', () => {
  it('renders the app context embed script', () => {
    const result = renderToStaticMarkup(<AppContext data={appContext} />)
    const appContextJson = JSON.stringify(appContext)
    const expected = `<script type="application/json" id="${APP_CONTEXT_ELEMENT_ID}">${appContextJson}</script>`

    expect(result).toBe(expected)
  })
})
