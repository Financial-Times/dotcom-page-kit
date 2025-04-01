
/**
 * Enhance the dropdown menu for JS users. This will ensure we can
 * perform the same actions as we do for non-JS users, however it enables
 * more interactivity of the dropdown buttons and enable them to send
 * tracking events on click.
 */
const init = () => {
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
            const dropdownButton = dropdownContainer.querySelector('.o-header__dropdown-button');
            if (!dropdownContainer.contains(event.target)) {
                dropdownButton.removeAttribute('data-dropdown-button-active');
            }
        });
    });

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

export const DropdownNavigation = {
    init
};