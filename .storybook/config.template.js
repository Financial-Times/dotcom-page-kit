//__PLACEHOLDER:NOTE__//

import { withOptions } from '@storybook/addon-options'
import { addDecorator, configure } from '@storybook/react'

addDecorator(
  withOptions({
    addonPanelInRight: true
  })
)

function loadStories() {
  // automatically import all files under __stories__
  const req = require.context('../packages', true, /\/__stories__\/[\w\.\-]+\.(j|t)sx?$/)
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
