import deepFreeze from 'deep-freeze'

export const navigationWithEditionsBasedFields = (navigation, editions) => {
  // Navigation data from the anvil-ft-server-navigation package is frozen
  // and must be cloned before modification
  const clonedNavigation = JSON.parse(JSON.stringify(navigation))
  const currentEdition = editions.current && editions.current.id ? editions.current.id : null

  clonedNavigation.navbar = currentEdition === 'international' ? 'navbar-international' : 'navbar-uk'
  clonedNavigation.drawer = currentEdition === 'international' ? 'drawer-international' : 'drawer-uk'

  return deepFreeze(clonedNavigation)
}
