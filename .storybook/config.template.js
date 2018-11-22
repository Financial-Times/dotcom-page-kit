//__PLACEHOLDER:NOTE__//

import { withOptions } from '@storybook/addon-options'
import { addDecorator, configure } from '@storybook/react'

addDecorator(
  withOptions({
    addonPanelInRight: true
  })
)

configure(loadStories, module)

function loadStories() {
  //__PLACEHOLDER:STORIES__//
}
