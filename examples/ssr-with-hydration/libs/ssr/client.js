import React from 'react'
import { hydrate } from 'react-dom'

function getInitialPropsFromDom({ initialPropsElementId = 'initial-props' }) {
  return JSON.parse(document.getElementById(initialPropsElementId).innerHTML)
}

async function getDependencies(page) {
  if (!page.getDependencies) return {}
  return await page.getDependencies()
}

export async function mount(options) {
  const { routes, elementId = 'app' } = options
  const { $$page, ...initialProps } = getInitialPropsFromDom(options)

  for (let route of routes) {
    if (route.name === $$page) {
      const Page = (await route.component()).default
      const dependencies = await getDependencies(Page)

      hydrate(<Page.component {...initialProps} {...dependencies} />, document.getElementById(elementId))
      break
    }
  }
}
