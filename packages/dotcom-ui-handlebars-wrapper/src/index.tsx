import * as React from 'react'
import { PageKitHandlebars, TPageKitHandlebarsOptions } from '@financial-times/dotcom-server-handlebars'

export const createHandlebarsWrapper = (options: TPageKitHandlebarsOptions = {}) => {
  const renderer = new PageKitHandlebars(options)

  return (templatePath: string) => {
    const template = renderer.loadTemplate(templatePath)

    return (props: Object) => (
      <div
        dangerouslySetInnerHTML={{
          __html: template(props)
        }}
      />
    )
  }
}

export const handlebarsWrapper = createHandlebarsWrapper()
