import Header from '@financial-times/o-header'
import TypeAhead from 'n-topic-search'
import { h, render } from 'preact'
import { DropdownNavigation } from './src/components/dropdown-navigation/dropdownNavigation'

/**
 * @typedef HeaderOptions
 * @property { HTMLElement } [rootElement] - the root element passed to o-header
 * @property { string } [hostName]
 */

/**
 * Initialise the header
 * @param { HeaderOptions } headerOptions
 */
export const init = (headerOptions = {}) => {
  const topicSearchElements = document.querySelectorAll(
    '.o-header [data-n-topic-search], .o-header__drawer [data-n-topic-search]'
  )
  topicSearchElements.forEach((element) => {
    const oheaderContainer = element.parentElement
    const oheaderContainerParent = oheaderContainer?.parentElement
    const isDrawer = oheaderContainerParent?.parentElement?.getAttribute('data-o-header-drawer') === 'true'

    const form = oheaderContainer?.querySelector('form')
    const input = form?.querySelector('input')
    const typeaheadContainer = document.createElement('div')
    typeaheadContainer.id = `suggestions-${input?.id}`
    typeaheadContainer.className = 'typeahead__main-container'
    typeaheadContainer.role = 'listbox'

    if (!form || !input) return

    if (isDrawer) {
      const mobileDrawer = oheaderContainerParent?.parentElement
      element.appendChild(typeaheadContainer)

      render(h(TypeAhead, {container: mobileDrawer, inputId: input.id}), typeaheadContainer)
    } else {
      form.after(typeaheadContainer)
      render(h(TypeAhead, {container: oheaderContainerParent, inputId: input.id}), typeaheadContainer)
    }
  })

  DropdownNavigation.init();

  Header.init(headerOptions.rootElement)
}

export { Header as OrigamiHeader }