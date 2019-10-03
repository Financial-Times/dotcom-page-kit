import * as React from 'react'
import { PageKitHandlebars } from '@financial-times/dotcom-server-handlebars'

const renderer = new PageKitHandlebars()

export const handlebarsWrapper = (templatePath: string) => (props: Object) => (
  <div
    dangerouslySetInnerHTML={{
      __html: renderer.render(templatePath, props)
    }}
  />
)
