import { appContext } from '../../__fixtures__/appContext'
import { prepareEmbedString } from '../prepareEmbedString'
import { APP_CONTEXT_ELEMENT_ID } from '../../constants'

describe('prepareEmbedString(appContext)', () => {
  it('returns a script embed string for the supplied app context', () => {
    const jsonContext = JSON.stringify(appContext)
    const embedString = `<script type="application/json" id="${APP_CONTEXT_ELEMENT_ID}">${jsonContext}</script>`
    const result = prepareEmbedString(appContext)
    expect(result).toBe(embedString)
  })
})
