import Header from '@financial-times/o-header'
import TypeAhead from 'n-topic-search'
import { h, render } from 'preact'

/**
 * @typedef HeaderOptions
 * @property { HTMLElement } [rootElement] - the root element passed to o-header
 * @property { string } [hostName]
 */

/**
 * Initialise the header
 * @param { HeaderOptions } headerOptions
 */
export const init = async (headerOptions = {}) => {
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

      render(h(TypeAhead, { container: mobileDrawer, inputId: input.id }), typeaheadContainer)
    } else {
      form.after(typeaheadContainer)
      render(h(TypeAhead, { container: oheaderContainerParent, inputId: input.id }), typeaheadContainer)
    }
  })

  enhanceDropdownMenuForJs();

  const proDropdownButton = document?.querySelector('.o-header__professional-dropdown')
  if (proDropdownButton) {
    const getProDropdownLinks = await fetch('https://pro-navigation.ft.com/api/links')
    // render a new version of the DropdownMenu with links retrieved by pro-navigation. That response
    // will include things like: access to MPR, access to Advanced Sharing and link to Subscription
    // Manager in case user is a licence admin. Icons should be updated according to the response as well.
  }

  Header.init(headerOptions.rootElement)
}

/**
 * Enhance the dropdown menu for JS users. This will ensure we can
 * perform the same actions as we do for non-JS users, however it enables
 * more interactivity of the dropdown buttons and enable them to send 
 * tracking events on click.
 */
const enhanceDropdownMenuForJs = () => {
   // Use querySelectorAll as there could be multiple dropdowns on the page
  const dropdowns = document?.querySelectorAll('.o-header__professional-dropdown');
 
  dropdowns.forEach(dropdownContainer => {
    const dropdownButton = dropdownContainer.querySelector('.o-header__professional-dropdown-button');
    const closeDropdownButton = dropdownContainer.querySelector('.o-header__professional-dropdown-close-button-mobile');

    // For Non-JS users the pointer events on the dropdown button are
    // disabled by default as it is the only way to enable the button
    // to both open and close the dropdown. This will not be needed for JS
    dropdownButton.style.pointerEvents = 'auto';
    dropdownButton.addEventListener('click', () => {
      // When the dropdown button has been clicked before and the dropdown is currently shown
      // reset the button's active data attribute and blur the button (to remove focus and hide the dropdown)
      if (dropdownButton.hasAttribute('data-dropdown-button-active')) {
        dropdownButton.removeAttribute('data-dropdown-button-active')
        // Unlike in no-js we want to have pointer events on the dropdown button
        // in order to send tracking events on click. However, to close the dropdown
        // we need to remove the focus from the button, so we blur it.
        dropdownButton.blur();
      } else {
        // When the dropdown has just been clicked, 
        // so we know the dropdown is actively getting shown now
        dropdownButton.setAttribute('data-dropdown-button-active', 'true')
      }
    });


    // For Non-JS MOBILE users the closing of the dropdown
    // is handled by playing with the visibility and pointer events
    // of the close button which enables to remove the focus so we can close the dropdown,
    // this will not be needed for JS 
    closeDropdownButton.style.visibility = 'visible';
    closeDropdownButton.style.pointerEvents = 'auto';
    // When the close button is clicked, reset the dropdown button so we can open the dropdown
    // correctly next time we click the dropdown button. 
    // Also blur the close dropdown button (the mobile close button) to close the dropdown
    closeDropdownButton.addEventListener('click', () => {
      dropdownButton.removeAttribute('data-dropdown-button-active')
      closeDropdownButton.blur();
    });

    // When clicking outside the dropdown, reset the dropdown button by
    // removing the data attribute from the dropdown button to enable the dropdown to be opened correctly again
    document.addEventListener('click', (event) => {
      if (!dropdownContainer.contains(event.target)) {
        dropdownButton.removeAttribute('data-dropdown-button-active')
      }
    });
  });

  // Observe when the sticky header becomes visible and when it hides
  // and when it does we need to close the dropdown if it is open
  // This is needed since there are two headers and each has a dropdown
  // so we shouldn't be showing the sticky header's dropdown when the 
  // sticky header is not visible, or show the regular header's dropdown
  // when the sticky header is visible
  const stickyHeader = document?.querySelector('.o-header--sticky');
  const stickyHeaderObserver = new IntersectionObserver((changes) => {
    for(let change of changes) {
      if (document.documentElement.clientWidth >= 780 || (document.documentElement.clientWidth < 780 && !change.isIntersecting)) {
        const closestDropdownParent = document.activeElement.closest('.o-header__professional-dropdown');
        if (closestDropdownParent) {
          const dropdownButton = closestDropdownParent.querySelector('.o-header__professional-dropdown-button');
          dropdownButton.removeAttribute('data-dropdown-button-active');
          document.activeElement.blur();
        }
      }
    }
  }, { threshold: [0.01] });

  stickyHeaderObserver.observe(stickyHeader);
}

export { Header as OrigamiHeader }
