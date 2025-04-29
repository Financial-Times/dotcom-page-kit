/* eslint-disable no-console */
import { PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST } from './constants'

/**
 * Enhance the dropdown menu for JS users. This will ensure we can
 * perform the same actions as we do for non-JS users, however it enables
 * more interactivity of the dropdown buttons and enable them to send
 * tracking events on click.
 */
const enhanceInteractivity = () => {
  // Use querySelectorAll as there could be multiple dropdowns on the page
  const dropdowns = document?.querySelectorAll('.o-header__dropdown')
  if (!dropdowns || dropdowns.length === 0) {
    return
  }

  dropdowns.forEach((dropdownContainer) => {
    const dropdownButton = dropdownContainer.querySelector('.o-header__dropdown-button')
    const closeDropdownButton = dropdownContainer.querySelector('.o-header__dropdown-close-button-mobile')

    // For Non-JS users the pointer events on the dropdown button are
    // disabled by default as it is the only way to enable the button
    // to both open and close the dropdown. This will not be needed for JS
    dropdownButton.style.pointerEvents = 'auto'
    dropdownButton.addEventListener('click', () => {
      // When the dropdown button has been clicked before and the dropdown is currently shown
      // reset the button's active data attribute and blur the button (to remove focus and hide the dropdown)
      if (dropdownButton.hasAttribute('data-dropdown-button-active')) {
        dropdownButton.removeAttribute('data-dropdown-button-active')
        // Unlike in no-js we want to have pointer events on the dropdown button
        // in order to send tracking events on click. However, to close the dropdown
        // we need to remove the focus from the button, so we blur it.
        dropdownButton.blur()
      } else {
        // When the dropdown has just been clicked,
        // so we know the dropdown is actively getting shown now
        dropdownButton.setAttribute('data-dropdown-button-active', 'true')
      }
    })

    // For Non-JS MOBILE users the closing of the dropdown
    // is handled by playing with the visibility and pointer events
    // of the close button which enables to remove the focus so we can close the dropdown,
    // this will not be needed for JS
    closeDropdownButton.style.visibility = 'visible'
    closeDropdownButton.style.pointerEvents = 'auto'
    // When the close button is clicked, reset the dropdown button so we can open the dropdown
    // correctly next time we click the dropdown button.
    // Also blur the close dropdown button (the mobile close button) to close the dropdown
    closeDropdownButton.addEventListener('click', () => {
      dropdownButton.removeAttribute('data-dropdown-button-active')
      closeDropdownButton.blur()
    })
  })

  // When clicking outside the dropdown, reset the dropdown button by
  // removing the data attribute from the dropdown button to enable the dropdown to be opened correctly again
  document.addEventListener('click', (event) => {
    dropdowns.forEach((dropdownContainer) => {
      const dropdownButton = dropdownContainer.querySelector('.o-header__dropdown-button')
      if (!dropdownContainer.contains(event.target)) {
        dropdownButton && dropdownButton.removeAttribute('data-dropdown-button-active')
      }
    })
  })

  // Observe when the sticky header becomes visible and when it hides
  // and when it does we need to close the dropdown if it is open
  // This is needed since there are two headers and each has a dropdown
  // so we shouldn't be showing the sticky header's dropdown when the
  // sticky header is not visible, or show the regular header's dropdown
  // when the sticky header is visible
  const stickyHeader = document?.querySelector('.o-header--sticky')
  if (!stickyHeader) {
    return
  }

  const stickyHeaderObserver = new IntersectionObserver(
    (changes) => {
      for (let change of changes) {
        if (
          document.documentElement.clientWidth >= 780 ||
          (document.documentElement.clientWidth < 780 && !change.isIntersecting)
        ) {
          const closestDropdownParent = document.activeElement.closest('.o-header__dropdown')
          if (closestDropdownParent) {
            const dropdownButton = closestDropdownParent.querySelector('.o-header__dropdown-button')
            dropdownButton.removeAttribute('data-dropdown-button-active')
            document.activeElement.blur()
          }
        }
      }
    },
    { threshold: [0.01] }
  )

  stickyHeaderObserver.observe(stickyHeader)
}

/**
 * Dispatches a custom event with tracking data when the dropdown content becomes visible.
 *
 * @param {Object} options - Configuration options for tracking.
 * @param {string} options.selector - The CSS selector used to identify the elements to track.
 * @param {string} options.intersectionObserverThreshold - Customise the how much of this element needs to be in the viewport to trigger the event.
 */
const trackDropdownView = (options) => {
  if (!window.IntersectionObserver) {
    return
  }

  const selector = options && options.selector
  const elementsToTrack = document.querySelectorAll(selector)
  if (elementsToTrack.length === 0) {
    return
  }

  const onChange = (changes, observer) => {
    changes.forEach((change) => {
      if (change.isIntersecting || change.intersectionRatio > 0) {
        const viewedEl = change.target
        const eventData = {
          action: 'view',
          category: 'component',
          className: viewedEl.className,
          componentContentId: viewedEl.dataset.id,
          url: window.document.location.href || null,
          nodeName: viewedEl.nodeName,
          href: viewedEl.href || false,
          text: viewedEl.text || false,
          role: viewedEl.role || false
        }

        document.body.dispatchEvent(new CustomEvent('oTracking.event', { detail: eventData, bubbles: true }))
        observer.unobserve(viewedEl)
      }
    })
  }

  const observer = new IntersectionObserver(onChange, {
    threshold: options?.intersectionObserverThreshold || [1.0]
  })

  elementsToTrack.forEach((el) => observer.observe(el))
}

/**
 * Dispatches a custom event with tracking data for Amplitude experiments.
 * 
 */
const trackDropdownExposure = () => {
  const flagProNavigation = document.querySelector('[data-flag-pro-navigation]')?.dataset.flagProNavigation

  if (flagProNavigation !== undefined) {
    const flagExposureValue = flagProNavigation === 'true' ? 'treatment' : 'control'

    document.body.dispatchEvent(
      new CustomEvent('oTracking.event', {
        detail: {
          category: 'amplitudeExperiment',
          action: 'exposure',
          event_properties: {
            flag_key: 'pro-navigation',
            variant: flagExposureValue,
            experiment_key: 'exp-1'
          }
        },
        bubbles: true
      })
    )
  }
}

/**
 * Updates the links in the Pro Navigation dropdown.
 *
 * @param {Object} options - Configuration options for updating the dropdown links.
 * @param {string} options.selector - The CSS class selector used to identify the dropdown(s) to update. This property is required when initializing the dropdown component
 * @param {string} options.trackingKey - A key used for tracking user interactions with the dropdown links and toggler.
 * @param {Array} options.defaultLinks - The default list of links to display in the dropdown if the API call fails or returns no data.
 * @param {string} options.proNavigationApi - The URL of the API endpoint to fetch the updated links.
 */
const updateProNavigationLinks = async (options) => {
  const { selector, trackingKey, defaultLinks, proNavigationApi } = options

  const proDropdowns = document.querySelectorAll(`.o-header__dropdown.${selector}`)
  if (proDropdowns.length === 0) {
    return
  }

  try {
    const links = await fetchLinks(proNavigationApi)

    if (
      !links ||
      !Array.isArray(links) ||
      links.length === 0 ||
      JSON.stringify(defaultLinks) === JSON.stringify(links)
    ) {
      return
    }

    proDropdowns.forEach((dropdown) => updateLinksList(dropdown, links, trackingKey))
  } catch (error) {
    const isFetchError = error.message.includes('fetch')
    const eventData = {
      action: isFetchError ? 'fetch' : 'update',
      category: 'error',
      component_name: 'dropdown-navigation',
      errorMessage: error.message
    }
    document.body.dispatchEvent(new CustomEvent('oTracking.event', { detail: eventData, bubbles: true }))
  }
}

const fetchLinks = async (url) => {
  const response = await fetch(url, { credentials: 'include' })
  if (!response.ok) {
    throw new Error(`Error during navigation links fetch! Status: ${response.status}`)
  }
  return response.json()
}

const updateLinksList = (dropdownEl, links, trackingKey) => {
  const list = dropdownEl.querySelector('.o-header__dropdown-list')
  if (!list) {
    return
  }

  // Determine the list item template
  const label = dropdownEl.querySelector('.o-header__dropdown-list-item-label-container')
  const listItem = label?.closest('.o-header__dropdown-list-item') || list.firstElementChild

  if (!listItem) {
    return
  }

  // Build the updated list
  const updatedListFragment = document.createDocumentFragment()
  links.forEach((link) => {
    const updatedItem = buildListItem(listItem, label, link, trackingKey)
    updatedItem && updatedListFragment.append(updatedItem)
  })

  // Update the DOM
  if (updatedListFragment.childNodes.length > 0) {
    list.replaceChildren(updatedListFragment)
  }
}

const buildListItem = (listItem, label, link, trackingKey) => {
  const listItemClone = listItem.cloneNode(true)
  const a = listItemClone.querySelector('a')
  const icon = a.querySelector('.o-header__dropdown-icon')
  const span = a.querySelector('span:not([class])')

  if (!listItemClone || !a || !icon || !span) {
    return
  }

  // Update class name
  listItemClone.classList.toggle('o-header__dropdown-list-divider', link.hasBottomLine)

  // Update link attributes
  a.setAttribute('href', link.href)
  const availableTrackingKey = trackingKey || a.dataset.trackingKey
  if (availableTrackingKey) {
    a.setAttribute('data-trackable', `${availableTrackingKey}_${link.id}_clicked`)
  }

  // Update icon and text
  icon.classList.forEach(
    (c) =>
      /^(?!.*__)[\w-]+-icon$/.test(c) &&
      icon.classList.replace(c, `${link.hasAccess ? link.icon : 'lock'}-icon`)
  )
  span.innerText = link.title

  // Update label: If a label is present, the cloned li item will need tidying up if no label is required
  if (label && !link.hasLabel) {
    a.lastElementChild?.className?.includes('label-container') && a.lastElementChild.remove()
  }

  return listItemClone
}

const init = () => {
  enhanceInteractivity()

  trackDropdownView({ selector: '.o-header__dropdown-content', intersectionObserverThreshold: 0.8 })
  trackDropdownExposure()

  updateProNavigationLinks({
    selector: 'pro_navigation',
    trackingKey: 'pro_navigation',
    defaultLinks: PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST,
    proNavigationApi: 'https://pro-navigation.ft.com/api/links'
  })

  // Add any dropdown navigation-specific initializations below.
}

export const DropdownNavigation = {
  init
}
