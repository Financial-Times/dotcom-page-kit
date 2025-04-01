/* eslint-disable no-console */
import { isEqual } from "./utils"
import { PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST } from "./constants"

/**
 * Enhance the dropdown menu for JS users. This will ensure we can
 * perform the same actions as we do for non-JS users, however it enables
 * more interactivity of the dropdown buttons and enable them to send
 * tracking events on click.
 */
const enhanceInteractivity = () => {
  // Use querySelectorAll as there could be multiple dropdowns on the page
  const dropdowns = document?.querySelectorAll('.o-header__dropdown')

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
        dropdownButton.removeAttribute('data-dropdown-button-active')
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

const updateLinksList = async () => {
  try {

    const links = await fetchLinks('https://pro-navigation.ft.com/api/links');
    if (!validateLinks(links) || isEqual(PRO_NAVIGATION_DROPDOWN_DEFAULT_LIST, links)) {
      return;
    }

    const linksList = document.querySelector('.o-header__dropdown-list');
    const listItem = linksList.querySelector('.o-header__dropdown-list-item');
    if (!linksList) {
      console.error('Links list element not found')
      return;
    }

    const label = extractLabel(listItem);

    const updatedListFragment = new DocumentFragment();
    links.forEach((link) => {
      const updatedItem = buildListItem({listItem, label}, link);
      updatedItem && updatedListFragment.append(updatedItem);
    });

    linksList.innerHTML = '';
    linksList.append(updatedListFragment);

  } catch (error) {
    console.error('Error fetching pro navigation links:', error)
  }
}

const fetchLinks = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const validateLinks = (links) => {
  if (!Array.isArray(links) || links.length === 0) {
    console.error('Invalid links data format or empty links list');
    return false;
  }
  return true;
};

const extractLabel = (listItem) => {
  if (!listItem) {
    console.error('List item template not found');
    return;
  }

  const label = new DocumentFragment();
  const siblingNodes = Array.from(listItem.querySelector('a').children).slice(1); // Skip the first child (list-item-details-container)
  siblingNodes.forEach(node => label.append(node));

  return label;
}

const buildListItem = (template, link) => {
  const { listItem , label } = template;
  if (!listItem) {
    console.error('List item template not found');
    return;
  }

  const listItemClone = listItem.cloneNode(true);
  const a = listItemClone.querySelector('a');
  const icon = a.querySelector('.o-header__dropdown-icon');
  const span = a.querySelector('span:not([class])');
  const labelClone = label.cloneNode(true);

  if (!listItemClone || !a || !icon || !span) {
    console.error('Invalid template structure');
    return;
  }
 
  // Update class name
  listItemClone.className = `o-header__dropdown-list-item ${link.hasBottomLine ? 'o-header__dropdown-list-divider' : ''}`;

  // Update link attributes
  a.setAttribute('href', link.href);

  const match = a.getAttribute('data-trackable')?.match(/^(.*)_.*_clicked$/);
  const trackingKey = match ? match[1] : 'pro-navigation';
  a.setAttribute('data-trackable', `${trackingKey}_${link.id}_clicked`);

  // Update icon and text
  icon.className = `o-header__dropdown-icon ${link.hasAccess ? link.icon + '-icon' : 'lock-icon'}`;
  span.innerText = link.title;

  // Append label
  if (link.hasLabel) {
    a.appendChild(labelClone);
  }

  return listItemClone;
};

const init = () => {
  updateLinksList()
  enhanceInteractivity()
}

export const DropdownNavigation = {
  init
}
