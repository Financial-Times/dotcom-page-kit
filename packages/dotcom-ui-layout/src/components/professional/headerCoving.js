/**
 * Track a view event for a given DOM selector by dispatching an `oTracking.event`.
 *
 * @param {Object} [options] - Optional configuration.
 * @param {string} [options.selector] - CSS selector for the element to track.
 * @returns {void}
 */
const trackBarView = (options) => {
  const selector = options && options.selector
  const elementToTrack = document.querySelector(selector)
  if (!elementToTrack) {
    return
  }

  const eventData = {
    action: 'view',
    category: 'component',
    className: elementToTrack.className,
    url: window.document.location.href || null,
    nodeName: elementToTrack.nodeName,
    component_name: 'pro-bar'
  }

  document.body.dispatchEvent(new CustomEvent('oTracking.event', { detail: eventData, bubbles: true }))
}

/**
 * Update the organisation title shown in the coving element.
 *
 * Fetches licence information from the provided proNavigationApi URL and updates
 * the organisation name in the coving element. Emits tracking events on error.
 *
 * @param {Object} options - Configuration options.
 * @param {string} options.proNavigationApi - URL to fetch licence info from.
 * @returns {Promise<void>}
 */
const updateTitle = async (options) => {
  if (!isDesktopOrTabletView()) {
    return
  }
  const { proNavigationApi } = options

  const coving = document.querySelector(`.n-layout__pro-coving`)
  const textContainer = document.querySelector('.n-layout__pro-coving-text')
  if (!coving || !textContainer) {
    return
  }

  try {
    const licenceInfo = await fetchLicenceInfo(proNavigationApi)

    if (!licenceInfo || !licenceInfo.organisationName) {
      return
    }

    if (licenceInfo.organisationName && licenceInfo.organisationName.length < 51) {
      textContainer.classList.add('is-fading-out')
      textContainer.addEventListener("transitionend", () => {
        updateOrganisationName(coving, licenceInfo.organisationName)
        textContainer.classList.remove('is-fading-out')
        textContainer.classList.add('is-fading-in')
      });
    }
  } catch (error) {
    const isFetchError = error.message.includes('fetch')
    const eventData = {
      action: isFetchError ? 'fetch' : 'update',
      category: 'error',
      component_name: 'pro-bar',
      errorMessage: error.message
    }
    document.body.dispatchEvent(new CustomEvent('oTracking.event', { detail: eventData, bubbles: true }))
  } finally {
    setTimeout(() => {
      textContainer.classList.remove('is-fading-out')
      textContainer.classList.remove('is-fading-in')
    }, 510)
  }
}

/**
 * Fetch licence information from the given URL.
 *
 * Uses fetch with credentials included. Throws an Error if the response is not ok.
 *
 * @param {string} url - The API endpoint to fetch licence info from.
 * @returns {Promise<Object>} Resolves with the parsed JSON response.
 * @throws {Error} If the network response is not ok.
 */
const fetchLicenceInfo = async (url) => {
  const response = await fetch(url, { credentials: 'include' })
  if (!response.ok) {
    throw new Error(`Error during licence info fetch! Status: ${response.status}`)
  }
  return response.json()
}

/**
 * Update the organisation name within the coving element.
 *
 * @param {Element} covingEl - The coving DOM element that contains the organisation name element.
 * @param {string} organisationName - The organisation name to display.
 * @returns {void}
 */
const updateOrganisationName = (covingEl, organisationName) => {
  if (!covingEl || !organisationName) {
    return
  }

  const organisationNameEl = covingEl.querySelector('.n-layout__pro-coving-organisation')
  if (organisationNameEl) {
    organisationNameEl.textContent = organisationName
  }
}

/**
 * Determine if the current device is a desktop or tablet.
 *
 * Checks the user agent to identify mobile devices. Uses the modern `navigator.userAgentData` API
 * if available, otherwise falls back to parsing `navigator.userAgent`. Returns `true` for desktop
 * and tablet devices, `false` for mobile phones.
 *
 * @returns {boolean} `true` if the device is desktop or tablet, `false` if mobile.
 */
function isDesktopOrTabletView() {
  if (navigator.userAgentData && navigator.userAgentData.mobile) {
    return !navigator.userAgentData.mobile
  }

  const ua = navigator.userAgent.toLowerCase()

  if (ua.includes('ipad') || (ua.includes('macintosh') && 'ontouchend' in window)) {
    return true
  }

  if (ua.includes('iphone') || ua.includes('ipod')) {
    return false
  }

  if (ua.includes('android') && ua.includes('mobile')) {
    return false
  }

  if (
    ua.includes('windows phone') ||
    ua.includes('blackberry') ||
    ua.includes('bb10') ||
    ua.includes('opera mini')
  ) {
    return false
  }

  return true
}

/**
 * Initialise the ProBar component: track view and update title.
 *
 * @returns {void}
 */
const init = () => {
  trackBarView({ selector: '.n-layout__pro-coving' })

  updateTitle({
    proNavigationApi: 'https://pro-navigation.ft.com/api/licence/info'
  })
}

export const ProBar = {
  init
}
